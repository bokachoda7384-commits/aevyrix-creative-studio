<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Site content (services, packages, FAQ, portfolio, contact placeholders) lives in src/lib/site-data.ts — single source until the admin dashboard moves it to the database.
- Public forms insert through server functions in src/lib/forms.functions.ts using a publishable client + anon INSERT-only RLS; no public reads of inquiries/messages.
