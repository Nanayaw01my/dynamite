# Setting up the website admin

This is a one-time setup, done by whoever manages the website. After it is
finished, anyone at the church you give access to can log in at
**`yoursite.com/admin`**, upload the church logo and photographs, change service
times, add sermons and events, and save — and the website updates itself.

No server to pay for, no database, no code.

---

## How it works

```
Church admin edits at /admin
        │
        ▼
Changes and uploaded images are saved to GitHub
        │
        ▼
Vercel notices the change and rebuilds the site (about a minute)
        │
        ▼
The live website shows the update
```

Every change is stored in the church's GitHub repository, so nothing is ever
lost and any mistake can be undone.

---

## Step 1 — Put the site on Vercel

1. Go to <https://vercel.com> and sign up with the church's GitHub account.
2. Click **Add New → Project** and pick the `dynamite` repository.
3. Leave every build setting empty — this is a plain site with no build step.
4. Click **Deploy**.

Vercel gives the site an address like `dynamite.vercel.app`. Write it down;
the next steps need it.

## Step 2 — Create the GitHub login

This lets the church sign in to the admin using their GitHub account.

1. Go to <https://github.com/settings/developers> → **OAuth Apps** →
   **New OAuth App**.
2. Fill it in:
   - **Application name**: `Dynamite Faith Church Website Admin`
   - **Homepage URL**: `https://your-address` (the address from Step 1)
   - **Authorization callback URL**: `https://your-address/api/callback`

   The callback URL must match character for character, including `https://`
   and `/api/callback`. A mismatch here is the most common cause of a login
   that opens and immediately closes.
3. Click **Register application**.
4. Copy the **Client ID**.
5. Click **Generate a new client secret** and copy it. **GitHub shows the secret
   only once** — copy it before leaving the page.

## Step 3 — Give Vercel the two keys

1. In Vercel, open the project → **Settings** → **Environment Variables**.
2. Add these two:

   | Name | Value |
   | --- | --- |
   | `GITHUB_CLIENT_ID` | the Client ID from Step 2 |
   | `GITHUB_CLIENT_SECRET` | the client secret from Step 2 |

3. Go to **Deployments** and click **Redeploy** so the new keys take effect.

> Keep the client secret private. It belongs only in Vercel — never in a
> message, a document, or the website's own files.

## Step 4 — Log in

Visit `https://your-address/admin`, click **Login with GitHub**, and approve.
The editor opens.

There is no address to configure: the admin uses whatever address it was opened
from. The one thing that must match the deployment is `branch:` in
`admin/config.yml` — currently `claude/dynamite-faith-church-site-m72ppw`, this
repository's default branch. If the branch is ever renamed, change it there too
or saving will fail.

---

## Giving other people access

Anyone who can edit the site needs write access to the GitHub repository:

**GitHub → the `dynamite` repo → Settings → Collaborators → Add people.**

They then sign in at `/admin` with their own GitHub account. Remove their
collaborator access and they can no longer edit the site.

---

## Using the admin

Open `/admin` and choose **Website → Church details**. Everything on the site is
in there, grouped the way it appears on the page:

| Section | What you can change |
| --- | --- |
| **Church details** | Name, **logo upload**, location, phone numbers, email, map |
| **About our church** | Who We Are, Mission, Vision, Values |
| **Service times** | Sunday Worship, Bible Study, Prayer Meetings, Special Services |
| **Ministries** | Add, remove and reorder ministries |
| **Sermons** | Title, speaker, date, cover image, YouTube link |
| **Events** | Title, date, time, location, description |
| **Photo gallery** | Upload church photographs with captions |
| **Social media** | Facebook, YouTube, Instagram, TikTok links |

Click **Save** and the site updates in about a minute.

### Uploading the logo

**Church details → Logo → Choose an image.** A square image (for example
512×512) works best. It appears in the header, the footer and the browser tab.

### Uploading photographs

**Photo gallery → Add → Photograph.** Please also fill in *Description for
screen readers* — it is what blind visitors hear in place of the picture, and it
helps the church appear in Google image results.

Photographs taken on a phone are often 4–8 MB, which is slow to load on mobile
data. Resizing them to about 1600 pixels wide before uploading makes the site
noticeably faster for people on phones.

### The "sample content" switches

Sermons, events and service times start as clearly-marked examples. Each one has
a **Sample content** switch — turn it off once you have entered real
information, and the "sample" notice disappears from the site.

### Turning on the map

The contact page shows a designed location panel by default, because embedded
maps are blocked in some previews. Once the site is on the church's own domain,
turn on **Church details → Show the embedded Google map**.

---

## Connecting the church's own domain

In Vercel: **Settings → Domains → Add**, then enter the domain (for example
`dynamitefaith.org`) and follow the instructions shown.

Afterwards, update the **GitHub OAuth App** from Step 2 — its Homepage URL and
Authorization callback URL must point at the new domain, or the login stops
working. Nothing in the repository needs changing: the admin picks up the new
address by itself.

---

## If something goes wrong

**"GITHUB_CLIENT_ID is not set"** — Step 3 was missed, or the site was not
redeployed afterwards.

**Login popup opens and closes, nothing happens** — the Authorization callback
URL in the GitHub OAuth App does not exactly match
`https://your-address/api/callback`. It must match character for character,
including `https://`.

**"Login session expired"** — the popup sat open too long. Close it and try
again.

**Saved, but the site looks the same** — give it a minute, then refresh. Check
**Deployments** in Vercel: if the newest one is red, the change did not build.

**A change broke something** — every save is a commit in GitHub, so any change
can be undone. Open the repository's **Commits** and revert the one that caused
it, or ask for help restoring it.
