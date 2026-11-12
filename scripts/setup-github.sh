#!/usr/bin/env bash
# Configura o repositório no GitHub conforme o Guia de Engenharia (seções 3.1 e 5.4).
# Requer: gh autenticado (gh auth login) com permissão de ADMIN no repositório.
# Uso: bash scripts/setup-github.sh [owner/repo]
set -euo pipefail

REPO="${1:-asciijr/ERP_Operacional_SQUAD_1}"
echo ">> Repositório: $REPO"

# 1. develop existe e é a branch padrão
if ! gh api "repos/$REPO/branches/develop" >/dev/null 2>&1; then
  MAIN_SHA=$(gh api "repos/$REPO/git/ref/heads/main" --jq .object.sha)
  gh api "repos/$REPO/git/refs" -f ref=refs/heads/develop -f sha="$MAIN_SHA" >/dev/null
  echo ">> develop criada a partir da main"
fi

# 2. Estratégias de merge: squash (trabalho) + merge commit (release/sync), sem rebase,
#    e exclusão automática da branch após o merge
gh api -X PATCH "repos/$REPO" \
  -f default_branch=develop \
  -F allow_squash_merge=true \
  -F allow_merge_commit=true \
  -F allow_rebase_merge=false \
  -F delete_branch_on_merge=true \
  -f squash_merge_commit_title=PR_TITLE \
  -f squash_merge_commit_message=PR_BODY >/dev/null
echo ">> develop como padrão; squash + merge commit; rebase off; auto-delete on"

# 3. Rulesets (proteção) para develop e main
create_ruleset() {
  local name="$1" branch="$2" checks="$3"
  # Remove ruleset homônimo para o script ser idempotente
  local existing
  existing=$(gh api "repos/$REPO/rulesets" --jq ".[] | select(.name==\"$name\") | .id" || true)
  [ -n "$existing" ] && gh api -X DELETE "repos/$REPO/rulesets/$existing" >/dev/null

  gh api -X POST "repos/$REPO/rulesets" --input - >/dev/null <<JSON
{
  "name": "$name",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [],
  "conditions": { "ref_name": { "include": ["refs/heads/$branch"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    { "type": "pull_request", "parameters": {
        "required_approving_review_count": 1,
        "dismiss_stale_reviews_on_push": true,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true
    } },
    { "type": "required_status_checks", "parameters": {
        "strict_required_status_checks_policy": true,
        "required_status_checks": [ $checks ]
    } }
  ]
}
JSON
  echo ">> ruleset '$name' aplicado em $branch"
}

COMMON='{"context":"conventions"},{"context":"frontend"},{"context":"backend-node"},{"context":"docker"}'
create_ruleset "protecao-develop" "develop" "$COMMON"
create_ruleset "protecao-main" "main" "$COMMON,{\"context\":\"branch-guard\"}"

echo ""
echo "Concluído. Falta (manual, em Settings → Collaborators and teams):"
echo "  - adicionar os membros da squad com permissão Write (sem Admin)"
