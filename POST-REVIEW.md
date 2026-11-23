# Editorial and SEO review for kerryhatcher.com

November 22, 2026 · 43 posts

Each post has proposed copy, a search title and description, a reading-experience change, and any publication checks. Drafts are scoped to specific passages. The source files are the reference for dates, figures, quotations, code, links, and the author’s experience.

The PR also applies the editorial revisions. The live source in `src/content/posts/` is the implementation. Where the review calls for corroboration, the edits use the original evidence and keep uncertainty visible. The publication checks below record the remaining fact and source questions.

## Start with these pages

The table uses HTP’s saved Google Search Console data for `sc-domain:kerryhatcher.com`, October 25–November 21, 2026, fetched November 22 UTC. The report recorded 23 clicks on 2,340 impressions (0.98% CTR, average position 15.4). Google excluded anonymized queries from query-level rows. Average position mixes different queries and searches.

| Order | Post | Clicks / impressions | CTR | Avg. position | Proposed change |
| --- | --- | ---: | ---: | ---: | --- |
| 1 | [Private email providers](https://www.kerryhatcher.com/taking-control-of-your-email-part-1-choosing-a-private-email-provider/) | 7 / 998 | 0.70% | 13.2 | Put Fastmail and mailbox.org up front and surface the existing Linux and calendar trade-offs. The exact query “fastmail vs mailbox.org” had 3 clicks from 96 impressions at position 6.6. |
| 2 | [Custom-domain email](https://www.kerryhatcher.com/taking-control-of-your-email-part-2-using-your-own-domain-for-email/) | 1 / 391 | 0.26% | 9.3 | Make the setup outcome clear in the opening. Label the Fastmail and Cloudflare example and link straight to DNS records and testing. “fastmail dns” had 26 impressions and no clicks at position 18.8. Verify the provider’s current record instructions before revising the steps. |
| 3 | [Scarlett Solo review](https://www.kerryhatcher.com/gear-review-focusrite-scarlet-solo/) | 1 / 145 | 0.69% | 9.8 | Correct the product spelling in the headline and lead with the author’s online-meeting setup and Linux experience. Retain the existing URL. “focusrite scarlett solo review” had 14 impressions and no clicks at position 13.6. |
| 4 | [System76 Pangolin review](https://www.kerryhatcher.com/gear-review-system76-pangolin-12-2/) | 2 / 139 | 1.44% | 12.0 | Name the reviewed model and lead with the ownership verdict, supporting it with the author’s actual usage. “pangolin laptop” had 31 impressions at position 12.4. |
| 5 | [Encrypted smartphone calls](https://www.kerryhatcher.com/encrypt-your-calls-and-messages-on-your-smartphone/) | 2 / 269 | 0.74% | 44.4 | Answer the difference between ordinary carrier calls and end-to-end encrypted app calls early. Check product-specific claims before updating them. Low visibility makes this a content and intent question as well as a snippet question. |

In the separate September 22–October 19 window, the private email guide had 3 clicks on 525 impressions, the custom-domain guide had 1 on 354, and Scarlett Solo had 1 on 231. The recurring pattern supports putting those three first. Compare each URL and its named queries across equal 28-day windows after Google recrawls the edits. Track clicks, impressions, CTR, and position together, and record the deployment date. GA4 recorded 37 Organic Search sessions in the recent window across the site. Use that channel count for context since it measures a different event. The saved Bing report listed the sitemap as successful with 44 URLs and had sparse query rows. The prioritization above uses Google page and query evidence.

## Changes that help several posts

1. Give posts an explicit search description field. The current Astro pipeline derives the description from the first blank-line-delimited chunk and limits it to 100 words. Imported HTML can put several paragraphs in that chunk. In the local build, 39 of 43 descriptions exceeded 160 characters, a review heuristic. Give each page a useful, specific sentence and present the article’s answer early on the page. Google can generate different title links and snippets for different queries. [Google guidance on title links](https://developers.google.com/search/docs/appearance/title-link) · [Google guidance on snippets](https://developers.google.com/search/docs/appearance/snippet)
2. Keep the slug and align the page’s visible title with the search promise. The shared template appends the site name to the source title. If a feature headline needs its original wording, add a short optional metadata title and check the final rendered title and headline together. Give civic coverage precise place names, deadlines and document references, and give equipment reviews the model name and firsthand findings. [Google guidance on people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
3. Make the first screen answer the visit. At 390 px, the Part 1 email guide shows a four-line title, a broad privacy pitch and a stock photo before the comparison. The Scarlett Solo article puts its opening below the hero and photo credit. Put a useful verdict or route to the relevant section before those images. Retain credits and the calm article layout. Use jump links on long guides where the destination is genuine, and date old commands or closed public-comment windows in the lead.
4. Reserve image space and inspect meaningful images for appropriate alt text. The local article markup contains 512 images, of which 185 lack at least one intrinsic size attribute. Empty alt text needs image-by-image judgment. The November 21 three-page Seosmith scan flagged missing dimensions and descriptions of 556 and 479 characters on “A Successful Beginning” and “Better Python Logging.” The November 21 homepage Lighthouse lab run measured mobile CLS 0.153 and LCP 2.6 s, with 233 KiB estimated image savings. Desktop performance scored 100 and mobile 90. Validate fixes with repeat lab runs on the homepage and photo-heavy posts. The saved CrUX snapshots had insufficient origin field data on phone and desktop.
5. Fix the duplicate `email` anchor on the FY2026 budget post. Inspect where each existing link should land before renaming the second ID. The October 31 Seosmith crawl flagged broken internal links and other article issues. The newer November 21 scans covered only one and three pages, so use a fresh full crawl to verify the current status. The repository records a layout and media cleanup on November 21 UTC. Commit timestamps alone cannot date deployment.

## Coverage

Three Codex sessions using GPT-6.2 Sol at low effort drafted the proposals through Herdr Core. Pi with DeepSeek Flash Latest checked the two email guides and Scarlett Solo review. Claude Code with Haiku 5.5 at low effort cross-checked the EBS, EC2 SSH and RHEL Git archive caveats. The local Astro build succeeded and all 43 article routes returned 200 at 390 px. Each rendered one H1 and stayed within the viewport in the automated check. Desktop and mobile captures sampled the email provider guide, Scarlett Solo review and FY27 budget analysis. The report identifies factual questions that need primary-source or author confirmation before publication. The local build and saved audits reflect different environments and coverage. HTP exposed the broad Seosmith crawl summary, and the complete November 21 spot-check details. The broad report’s individual findings require an export unavailable through the connection.

## Post-by-post proposals

Search figures below are from the October 25–November 21 Google report. A missing exact-URL row indicates unavailable page-level evidence for this review.

### 2011-05-03-format-and-mount-ebs-in-ubuntu.html

[Source](src/content/posts/2011-05-03-format-and-mount-ebs-in-ubuntu.html) · [Article](https://www.kerryhatcher.com/format-and-mount-ebs-in-ubuntu/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue.** An EC2 user arriving from search could mistake a 2011 note for a current tutorial. The procedure creates a partition but subsequently targets the example whole-disk path for formatting and mounting. Identifying an extra disk by exclusion alone risks data loss.

**Proposed opening**

> These are my May 2011 notes for getting a newly attached Amazon EBS volume ready on an EC2 instance running the official Ubuntu 10.04 LTS image. I’ve kept the original steps below as a record of that setup. Formatting erases data, and the example uses `/dev/sdX` both where it creates a partition and where it formats the device. Confirm the volume and the intended filesystem target before running anything that writes to disk.

**Search title.** Formatting and Mounting EBS on Ubuntu 10.04 (2011)

**Search description.** Kerry Hatcher’s 2011 notes on preparing an added EBS volume on Ubuntu 10.04 LTS, with a caveat about the example disk path.

**Read-mode improvement.** Keep the ordered list and wrap each shell command and device path in inline code. Put the warning immediately before the list so it precedes the first write step.

**Before publication.** Check the actual device and partition names from the original setup before making any command correction. Verify the displayed uppercase `W` against that version of `fdisk`. Retain the commands as archival examples pending verification.

### 2011-05-03-ssh-to-aws-quick-and-dirty.html

[Source](src/content/posts/2011-05-03-ssh-to-aws-quick-and-dirty.html) · [Article](https://www.kerryhatcher.com/ssh-to-aws-quick-and-dirty/)

**Saved search data.** 0 clicks, 2 impressions, 0.00% CTR, average position 7.0.

**Reader and issue.** Someone connecting to their first EC2 instance needs to know which values come from their own setup. The example mixes key names, changes from a path under `.ssh` to a bare filename, and treats the Ubuntu login as universal.

**Proposed opening, before the numbered steps**

> Got your EC2 instance running? Here’s the quick OS X setup I wrote up in 2011. Copy the private key you downloaded when you created the instance into your `.ssh` directory and restrict its file permissions. When you connect, give SSH the path to that key with `-i`. The final line shows a sample Ubuntu login. Use the username for your instance’s image and the hostname for your own instance.

**Search title** — SSH into AWS EC2 with a PEM Key (2011)

**Search description** — A short 2011 OS X example of using an EC2 private key, setting file permissions and passing the key to SSH.

**Readability.** Put the two shell commands and the final SSH example in code blocks inside their respective steps. Keep the example intact and label its placeholders directly above it.

**Verify.** Before presenting this as a current recipe, test the working directory, existence of `.ssh`, key path and image-specific username. Identify the hostname as archival and correct the inconsistent filename only after checking the intended example.

### 2011-06-01-jenkins-hudson-on-ubuntu-10-04-lts.html

[Source](src/content/posts/2011-06-01-jenkins-hudson-on-ubuntu-10-04-lts.html) · [Article](https://www.kerryhatcher.com/jenkins-hudson-on-ubuntu-10-04-lts/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue** — A maintainer researching an old Jenkins installation could mistake the reassurance about the alternate repository for present-day advice.

**Replace the first paragraph**

> In June 2011, I installed Jenkins on Ubuntu 10.04 LTS using the Jenkins Debian package repository. On my setup, the alternate repository seemed to affect only Jenkins. I’d still have tried it in a virtual machine before touching a mission-critical server. The commands below document that 2011 setup.

**Search title** — Installing Jenkins on Ubuntu 10.04 LTS (2011)

**Search description** — A 2011 walkthrough of installing Jenkins on Ubuntu 10.04 LTS with the Debian package repository, including a Tomcat snag.

**Read mode** — Put the archive context before the first command. Rename “Warning” to “The Tomcat conflict I ran into” while retaining the existing anchor, and relabel the final “Reference” link “Original Jenkins Debian package instructions.”

**Before publication** — The prose says `/et/apt/sources.list` and the last command block runs two intended commands together on one line. Confirm the typo and intended line break before making a documented correction. Leave the HTTP repository and key commands identified as historical. Check the old link destinations and the wording of the Hudson/Jenkins history before modernizing that aside.

### 2011-08-10-networking-101-document-everything.html

[Source](src/content/posts/2011-08-10-networking-101-document-everything.html) · [Article](https://www.kerryhatcher.com/networking-101-document-everything/)

**Saved search data.** 0 clicks, 2 impressions, 0.00% CTR, average position 9.0.

**Reader and issue.** A first-time network installer gets the core advice in fragments. The title promises a documentation habit, while the lead section makes it sound like a recommendation for one diagramming tool.

**Proposed opening, before the network diagram**

> Documentation is your friend. Start before you touch the network. Draw what’s there, draw where you want it to go, and write down the steps between the two. Take pictures while you’re at it. The next person in that closet will want to know what you did and why. That person might be you.

**Search title.** Networking 101: Document Your Network Before You Start

**Search description.** Draw the current and planned network, photograph the existing setup, and leave a record the next person can use.

**Read-mode improvement.** Caption the municipal diagram with the existing City Hall–Fire Admin–Annex–Terminal Station connectivity described in its alt text and explain the planned, future, and wireless line types in adjacent text. Readers can then use the example without decoding the image at phone width.

**Before publication.** Test the original Visio 2010 and Dia links and frame those tool references and the BlackBerry aside as 2011 examples. Confirm the empty Blogger anchor’s purpose before removing it. Check whether the closet photo warrants descriptive alt or is supplementary to the adjacent prose.

### 2012-03-15-c-net-check-if-user-is-in-active-directory-group.html

[Source](src/content/posts/2012-03-15-c-net-check-if-user-is-in-active-directory-group.html) · [Article](https://www.kerryhatcher.com/c-net-check-if-user-is-in-active-directory-group/)

**Saved search data.** 0 clicks, 33 impressions, 0.00% CTR, average position 9.0.

**Reader and issue.** A C# developer could read “a user” as an arbitrary input. The snippet takes a group name and looks up the account from the environment.

**Proposed opening**

> Here’s a small C# example from 2012 for checking whether the account running the code belongs to a named Active Directory group. The function gets the username and domain from the environment and looks up the user by SAM account name. Add a reference to `System.DirectoryServices.AccountManagement` before trying the example.

**Search title** — Check Active Directory Group Membership in C#

**Search description** — A 2012 C# example using DirectoryServices.AccountManagement to check a named group for the account running the code.

**Readability.** Put an H2, “Check the current account’s group membership,” immediately before the existing C# block. Keep the reference requirement above the block where a reader can see it before copying.

**Verify.** Check target framework compatibility, behavior when the account lookup returns null, and nested-group semantics before claiming it works for current authorization decisions.

### 2012-03-20-mounting-network-drives-with-c-net.html

[Source](src/content/posts/2012-03-20-mounting-network-drives-with-c-net.html) · [Article](https://www.kerryhatcher.com/mounting-network-drives-with-c-net/)

**Saved search data.** 1 clicks, 10 impressions, 10.00% CTR, average position 5.2.

**Reader and issue** — A C# developer looking for a mapped Windows drive sees a download before learning what the wrapper does or how to interpret its Boolean result.

**Replace the opening thank-you and download paragraphs**

> I used [aejw’s NetworkDrive class](http://www.codeproject.com/Members/aejw?ref=kerryhatcher.com) to map a network share from C#. Big thanks to aejw for saving me the work. In this 2012 example, the wrapper calls the class with its default credentials behavior when you leave the user argument alone, or passes along the username and password you supply. It returns false if an exception is caught during setup or mapping.
>
> Open the [original NetworkDrives0015 source ZIP](http://www.codeproject.com/KB/system/mapnetdrive/NetworkDrives0015_src.zip?ref=kerryhatcher.com), then extract `cNetworkDrives0015.cs` and add it to your project.

**Search title** — Mapping a Network Drive in C# with NetworkDrive

**Search description** — A 2012 C# example using aejw’s NetworkDrive class to map a share, pass optional credentials, and handle a mapping failure.

**Read mode** — Put the implementation under an H2 “Add the drive-mapping helper” and turn “Example Usage” into an H2 “Map a share and check the result.” Keep the UNC string and both branches of the sample intact.

**Before publication** — Check the download’s availability, redistribution terms if a mirror is contemplated, and the class’s platform support before implying the example works with a current .NET release. Both links retain their original targets.

### 2012-10-05-to-the-west.html

[Source](src/content/posts/2012-10-05-to-the-west.html) · [Article](https://www.kerryhatcher.com/to-the-west/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue.** The reader has almost no context before committing to a video. The short submarine line supplies the personality and can carry a little more context.

**Proposed opening**

> A little vacation video from 2012. That submarine was a tight fit!!

**Search title.** To the West | Kerry Hatcher’s 2012 Vacation Video

**Search description.** A short vacation post from Kerry Hatcher’s 2012 archive, featuring the video “To the West” and a tight squeeze in a submarine.

**Read-mode improvement.** Put a text link labeled “Watch To the West on YouTube” below the iframe using the same video ID, and extend the existing iframe title to “To the West — 2012 vacation video.” The direct link gives keyboard users and readers with blocked embeds another way to reach the video.

**Before publication.** Confirm playback and caption availability. Review the footage before adding a text description of scenes or identifying the submarine or location.

### 2013-08-20-exchange-2013-enable-all-users-mailboxes-and-add-all-users-to-distribution-group.html

[Source](src/content/posts/2013-08-20-exchange-2013-enable-all-users-mailboxes-and-add-all-users-to-distribution-group.html) · [Article](https://www.kerryhatcher.com/exchange-2013-enable-all-users-mailboxes-and-add-all-users-to-distribution-group/)

**Saved search data.** 0 clicks, 2 impressions, 0.00% CTR, average position 8.5.

**Reader and issue.** An administrator maintaining a legacy server may treat “all users” as a precise scope or assume every error is harmless. The pipelines query different recipient types and the second can include existing mailbox users.

**Proposed opening, before the first command**

> During our 2013 migration to a new domain, other techs were creating user accounts and I needed to give those users Exchange mailboxes. I ran the first command from the domain administrator login on the Exchange Client Access server. It selected user accounts with a user principal name and enabled their mailboxes. I already had an “All Users” distribution group. The second command queried mailbox users with a user principal name and added them to that group.

**Search title** — Exchange 2013 Bulk Mailboxes and Distribution Group Setup

**Search description** — A migration note on enabling Exchange 2013 mailboxes in bulk and populating an existing “All Users” distribution group.

**Readability.** Replace the two blockquotes with PowerShell code blocks labeled “Enable mailboxes” and “Populate the All Users group.” Put the duplicate-member warning explanation under the second block and limit it to the warnings Kerry saw.

**Verify.** Confirm shell and permissions, the actual recipient scope of each pipeline and the exact duplicate-member diagnostics before publishing this as runnable guidance.

### 2014-05-26-install-git-1-8-on-rhel-6.html

[Source](src/content/posts/2014-05-26-install-git-1-8-on-rhel-6.html) · [Article](https://www.kerryhatcher.com/install-git-1-8-on-rhel-6/)

**Saved search data.** 1 clicks, 19 impressions, 5.26% CTR, average position 9.7.

**Reader and issue** — A reader troubleshooting Git on a legacy RHEL system needs the exact tested release and the reason for installing `git18` before encountering root commands.

**Replace the first two paragraphs**

> PyCharm worked with the Git that shipped with RHEL 6.5, but it complained enough that I went looking for an update. In May 2014, I couldn’t find a newer Git in Fast Track. I found the separately named `git18` package through the [IUS Community Project](https://iuscommunity.org/pages/About.html?ref=kerryhatcher.com). Here’s the setup I used to choose Git 1.8 without updating the rest of my stock RHEL packages.

**Search title** — Installing Git 1.8 on RHEL 6.5 with IUS (2014)

**Search description** — How I used the IUS git18 package on RHEL 6.5 when PyCharm complained about the Git version shipped with the system.

**Read mode** — Put the root-session instructions under “Original RHEL 6.5 commands.” Set the shell and `yum search git` output in distinct preformatted code blocks with visible labels. Keep the IUS excerpt as a quotation and preserve the Git18.sh link.

**Before publication** — Check IUS’s historical SafeRepo terminology and the sourcing of the quotation. The HTTP RPM URLs, exact package versions, and repository behavior belong to the 2014 record. Confirm availability and integrity separately before characterizing any command as usable today.

### 2020-05-07-save-money-protect-your-site-with-a-cdn.html

[Source](src/content/posts/2020-05-07-save-money-protect-your-site-with-a-cdn.html) · [Article](https://www.kerryhatcher.com/save-money-protect-your-site-with-a-cdn/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue.** A site owner needs to understand the benefit and the trade-off before navigating vendor names. The 2020 pricing and product details can look current beside live links.

**Proposed opening, before the disclosures**

> A content delivery network can serve copies of your site’s files closer to your readers. That can make pages load faster and cut the traffic your own server has to handle. I’ve used Akamai, Amazon CloudFront, and Cloudflare on both personal projects and systems that had to stay up. Here’s how the caching works and what stood out to me about each service in May 2020.

**Search title.** How CDNs Work: CloudFront, Akamai, and Cloudflare in 2020

**Search description.** A firsthand 2020 comparison covering CDN edge caching, origin traffic, cache updates, and outage behavior.

**Read-mode improvement.** Under the cache-change question, use three short headings in sequence: “ETags,” “Versioned filenames,” and “Cache purges.” Keep the example filenames with the versioning explanation and the cost and timing caveats with the purge explanation.

**Before publication.** Check the CNAME and DNS-delegation claims provider by provider, the ETag description against conditional-request behavior, and the differences between cached outage responses and origin failover. Verify pricing, included invalidations, the Cloudflare Always Online link, VPC/S3 integration claims, and Luna naming before presenting any as current. Keep the disclosures and label the panel screenshots by what they depict after inspecting them.

### 2020-05-08-make-your-internet-faster-and-safer-for-free.html

[Source](src/content/posts/2020-05-08-make-your-internet-faster-and-safer-for-free.html) · [Article](https://www.kerryhatcher.com/make-your-internet-faster-and-safer-for-free/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue.** A home internet user may expect a bandwidth increase or a blanket privacy guarantee. One Firefox timing example shows where DNS can matter.

**Proposed opening, replacing the phone-book paragraph and throughput callout**

> DNS is the internet’s phone book. Us lowly humans remember names like `www.kerryhatcher.com`. DNS looks up the numbers computers use, like `104.16.23.84`. One page can pull in files from several hostnames, so a slow lookup can hold up part of the page.
>
> Think of DNS speed as time before a download can start. A 300 Mbps connection still has 300 Mbps of capacity. In one Firefox test from May 2020, DNS took 283 ms for a request that spent 124 ms receiving data.

**Search title** — Can Changing DNS Make Web Pages Load Faster?

**Search description** — A Firefox network trace shows how DNS lookup time can affect page loading, with a look at Cloudflare 1.1.1.1 and other resolvers.

**Readability.** Caption both Firefox figures with their different scopes: “Full page load: 109 requests” and “One request: 283 ms DNS, 124 ms receiving.” Keep the remaining timing details in the second image’s text alternative.

**Verify.** Date the DNSPerf ranking. Check current Firefox DNS over HTTPS defaults by region and mode, the audit’s date and scope, and the claims about log sales, CDN routing, filtering and device/router coverage before using present-tense promises.

### 2020-05-11-its-time-to-switch-to-a-new-email-provider.html

[Source](src/content/posts/2020-05-11-its-time-to-switch-to-a-new-email-provider.html) · [Article](https://www.kerryhatcher.com/its-time-to-switch-to-a-new-email-provider/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue** — A nontechnical reader choosing email may come away thinking every message crosses the internet in plaintext, or that switching providers automatically makes every message private.

**Replace the first three paragraphs**

> Think about the last time you clicked “Forgot password?” From Facebook to your bank, the reset link often lands in your inbox. That makes your email account worth protecting, even if you’ve never sent a message you’d call sensitive.
>
> The postcard analogy helps explain where ordinary email can fall short. When mail servers use transport encryption, it protects the message on that leg of the trip. The servers handling it can still read the message unless the contents are separately encrypted. In May 2020, that was one reason I recommended trying ProtonMail. I wanted email encryption that people could actually use.

**Search title** — Why I Recommended ProtonMail for Private Email in 2020

**Search description** — My 2020 case for ProtonMail, with a plain-language look at password resets, transport encryption, and where private email has limits.

**Read mode** — Make “Accessing ProtonMail with Tor” an H3 alongside “Security,” “Privacy,” and “Price.” Put the nerdy aside in body text and label the security-details and threat-model links by destination.

**Before publication** — Align the later “plain old emails” wording with the transport distinction. Check Proton’s 2020 and current plans, transparency claims, mobile encryption and external-recipient options, the onion address, and ownership or currency of the published key fingerprint. Source the Tor history and narrow the claims about anonymity and VPN protection. The closing “nothing to risk” and assurances about all browser traffic need particular attention.

### 2020-05-19-state-of-play-gaming-on-linux-in-the-roaring-20s.html

[Source](src/content/posts/2020-05-19-state-of-play-gaming-on-linux-in-the-roaring-20s.html) · [Article](https://www.kerryhatcher.com/state-of-play-gaming-on-linux-in-the-roaring-20s/)

**Saved search data.** 0 clicks, 15 impressions, 0.00% CTR, average position 9.5.

**Reader and issue.** A Linux-curious gamer needs the author’s practical reason for using Ubuntu and the scope of the game examples. The piece mixes native releases, Valve support and community reports, which can make compatibility sound guaranteed.

**Proposed opening, replacing the first two paragraphs**

> It’s the year of the Linux desktop. Again! I’d heard that plenty of times in 20 years of using [GNU](https://en.wikipedia.org/wiki/GNU?ref=kerryhatcher.com)/Linux. I’d been dual-booting for years, but I spent most of my time in Windows until that installation crashed in late 2019. I kept putting off the repair and remembered how much I liked using Ubuntu every day. Once I fixed Windows, I mostly went back for games I couldn’t play on Linux, especially [Sea of Thieves](https://www.seaofthieves.com/?ref=kerryhatcher.com) and [PUBG](https://www.pubg.com/en-us/?ref=kerryhatcher.com). Here’s what was working for me on Linux in May 2020 and where I still ran into limits.

**Search title.** Linux Gaming on Ubuntu 20.04: Steam, Proton, and Wine in 2020

**Search description.** Kerry Hatcher’s 2020 experience gaming on Ubuntu, from Steam and Proton to Wine, anti-cheat limits, and native games.

**Read-mode improvement.** Put the Steam favorites from the screenshot in adjacent text, using the exact game editions after checking the image. Rename the linked Steam gallery shots by their actual content and set the existing FreeCiv command in a shell code block.

**Before publication.** Verify Valve/Wine chronology and differentiate Valve-tested games from ProtonDB reports. Date the anti-cheat, Microsoft Store exclusivity, and CodeWeavers price claims. Check the Ubuntu 20.04 command as a historical example and keep it verbatim unless a tested correction is warranted.

### 2024-03-07-encrypt-your-calls-and-messages-on-your-smartphone.html

[Source](src/content/posts/2024-03-07-encrypt-your-calls-and-messages-on-your-smartphone.html) · [Article](https://www.kerryhatcher.com/encrypt-your-calls-and-messages-on-your-smartphone/)

**Saved search data.** 2 clicks, 269 impressions, 0.74% CTR, average position 44.4.

**Reader and issue.** A reader worried about calls and texts needs to distinguish interception of communications from someone taking over a number or faking caller ID.

**Proposed opening**

> Want to send someone a private message or make a private call from your phone? Give Signal a try. When both people use Signal, end-to-end encryption protects the contents of their Signal calls and messages in transit. I’ll also cover two different problems you can run into with ordinary phone service: caller-ID spoofing and SIM swapping.

**Search title** — How Signal Protects Calls and Messages on Your Phone

**Search description** — How Signal’s end-to-end encryption protects conversations, and how those protections differ from caller-ID spoofing and SIM swapping.

**Readability.** Promote “Spoofing and SIM swapping” to its own H2, with separate H3s for the two terms. Name the satellite update link “WIRED’s report on unencrypted satellite traffic” and date the callout when the update date is confirmed.

**Verify.** Check the satellite report’s date, operators and scope, the congressional adoption claim, and exactly what the Army guidance applied to. Verify the formal audit’s scope, current competing app encryption defaults and Signal’s identity-verification guidance. Code availability alone cannot prove that every distributed build is free of backdoors.

### 2025-03-07-better-python-logging.html

[Source](src/content/posts/2025-03-07-better-python-logging.html) · [Article](https://www.kerryhatcher.com/better-python-logging/)

**Saved search data.** 1 clicks, 8 impressions, 12.50% CTR, average position 7.4.

**Reader and issue** — A Python beginner wants to see when debugging prints become cumbersome. The current lead sends them away for code and later calls two outputs “Previous” and “Current” without explaining the changed totals.

**Replace the first paragraph and the paragraph below “Recognizing you have a problem”**

> Is that variable getting set? Why does the loop fail only sometimes? My first instinct is usually to add a `print()` and try again. Hello, I’m Kerry, and sometimes I abuse `print()`.
>
> We’ll use one little car-counting script throughout. First it prints every step, then we give those messages an on/off switch, and finally we use Loguru to show where each message came from and save a copy to a file. I’ll show how I sent a copy to CloudWatch, too.
>
> [Download the Python examples and local run instructions](https://github.com/kerryhatcher/kerryhatcher.github.io/tree/master/examples/better-python-logging?ref=kerryhatcher.com).

**Search title** — Better Python Logging with Loguru and CloudWatch

**Search description** — Follow one Python script from print debugging to Loguru levels, rotating files, and CloudWatch Logs through Watchtower.

**Read mode** — Label the output blocks “Output with debug printing enabled” and “Output with Loguru.” Add one sentence immediately above them explaining the car counts are random and the excerpt shows formatting from two example runs. Preserve timestamps and output text.

**Before publication** — Test the original examples with stated Python, Loguru, and Watchtower versions. Check the CloudWatch handler arguments, region and permissions prerequisites, pricing language, and conditions under which logs actually reach CloudWatch before a host failure. Confirm the repository path in the download link.

### 2025-03-07-crossover-2025.html

[Source](src/content/posts/2025-03-07-crossover-2025.html) · [Article](https://www.kerryhatcher.com/crossover-2025/)

**Saved search data.** 0 clicks, 39 impressions, 0.00% CTR, average position 14.4.

**Reader and issue.** Families browsing the photos wait through a generic definition and several galleries for the bridge sequence. First-time Scout families need one clear sentence about what crossing the bridge means.

**Proposed opening**

> At our 2025 crossover ceremony, Cubmaster Spencer Hawkins opened with a look back at the year and handed out awards earned since the last meeting. Then came the moment the families had gathered to see. Arrow of Light Scouts walked across the bridge, leaving their Cub Scout pack and being welcomed by their new troop.

**Search title.** 2025 Cub Scout Crossover Ceremony and Photos

**Search description.** See photos from the 2025 Arrow of Light crossover, from den awards to the Scouts crossing the bridge and joining their new troop.

**Read-mode improvement.** Add “Den awards” before the Hawkins, Hudson, and Hatcher groups and “Crossing the bridge” before the first bridge gallery. Give the final Lightroom card visible link text “View Kerry Hatcher’s full Crossover 2025 album,” retaining the distinct CC BY-SA 4.0 credit links.

**Before publication.** Confirm the running order, especially the lead’s implied sequence, and the preferred 2025 troop terminology. Review informative standalone photos with empty alt, including the first image under the opening, before drafting descriptions.

### 2025-03-10-using-rust-to-make-python-more-manageable-2.html

[Source](src/content/posts/2025-03-10-using-rust-to-make-python-more-manageable-2.html) · [Article](https://www.kerryhatcher.com/using-rust-to-make-python-more-manageable-2/)

**Saved search data.** 0 clicks, 1 impressions, 0.00% CTR, average position 10.0.

**Reader and issue.** A Python developer may expect the three-line example to produce a full project and install into the environment automatically. The command sequence creates a directory for a virtual environment, and the install target needs testing.

**Proposed opening, before “Introducing UV”**

> My new favorite Python tool is written in Rust. It’s called `uv`, and I like it because I can use one command-line tool to create a virtual environment and install packages. Below I’ll show the environment commands from my March 2025 example, using `requests` as the package to install.

**Search title** — Use uv to Manage Python Virtual Environments

**Search description** — A quick introduction to uv, the Rust-based Python tool for creating virtual environments and installing packages.

**Readability.** Split “Getting Started” into “Install uv” and “Create a virtual environment.” Put the Windows documentation link with the installation alternatives and label the `requests` code block with its intended result.

**Verify.** Test the exact `uv venv my_project`, `cd my_project`, `uv pip install requests` sequence in a clean shell and confirm which interpreter receives the package. Check the installer, supported platforms and comparison benchmarks before strengthening claims about compatibility, activation or speed.

### 2025-03-13-gear-review-focusrite-scarlet-solo.html

[Source](src/content/posts/2025-03-13-gear-review-focusrite-scarlet-solo.html) · [Article](https://www.kerryhatcher.com/gear-review-focusrite-scarlet-solo/)

**Saved search data.** 1 clicks, 145 impressions, 0.69% CTR, average position 9.8.

**Reader and issue** — Someone replacing a meeting headset needs to know which connectors and setup solved the author’s problem. That answer is buried below a generic TL;DR.

**Replace the first paragraph**

> I wanted a headset I could use for meetings all day. My Bose QuietComfort headphones were reliable for a while, until the battery issue got old. Some wired USB gaming headsets solved that problem, but they didn’t hold up to daily work. For years now, my answer has been a Focusrite Scarlett Solo. It connects the XLR microphone and quarter-inch headphone plug on my broadcast headset, and I can move the USB cable from my Pop!_OS machine to my work Mac.

**Search title** — Focusrite Scarlett Solo Review for Linux and Work Calls

**Search description** — My experience using a Focusrite Scarlett Solo with an XLR broadcast headset for daily meetings on Pop!_OS and a work Mac.

**Read mode** — Put “What worked for daily calls” where “TL;DR” appears. Lead its list with the direct-monitoring benefit in plain language. Keep the existing front and rear photo descriptions and the author’s plastic-cover caption with those photos.

**Before publication** — Confirm the hardware generation in the photos, which Windows and mobile devices were actually tested, and which generations the linked Linux firmware tool supports. Verify mixer-output compatibility for the unit and avoid implying independent multichannel recording. Use “Scarlett” in the visible title and preserve the existing slug.

### 2025-03-22-a-successful-beginning-not-an-end.html

[Source](src/content/posts/2025-03-22-a-successful-beginning-not-an-end.html) · [Article](https://www.kerryhatcher.com/a-successful-beginning-not-an-end/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue.** Alex II families should learn immediately what the board approved and what the author still wants to know. The current lead makes readers navigate photos before the decision, and the district’s approval does not establish the educators’ intentions.

**Proposed opening and first “A proud start” paragraph** (keep the meeting photo, its credit, and the linked screenshot immediately after)

> Wow. The Alex II community came together fast, and I’m grateful I got to work alongside you. At the [March 20, 2025 Bibb County School Board meeting](https://simbli.eboardsolutions.com/SB_Meetings/ViewMeeting.aspx?S=4013&MID=124185&Tab=Agenda&ref=kerryhatcher.com), the board approved lateral transfers for Assistant Principal Meredith Byrd and Principal Angel Woodard. I still don’t know whether either of them wants to take the transfer. I’m glad they have the option, and I want that choice to be theirs. We still have work to do for the kids.

**Search title.** Alex II Administrator Transfers and What Comes Next | March 2025

**Search description.** A Bibb County parent responds to the March 20 transfer decision and updates families on open records requests and support for students.

**Read-mode improvement.** Replace the three line-break-separated “FOIA Updates” entries with a real list under “Open records requests.” Make the document topic and the March 2025 status visible in each item. Give the Board Brief screenshot link a text label that names its destination and verify whether the image caption should call it a Board Brief or minutes.

**Before publication.** Compare the transfer wording with the board record, including any distinction between an approved offer and an accepted reassignment. Attribute any causal claim about the community effort to the author’s judgment and keep the resident’s quote verbatim. Verify whether the historical signup still works and retain the later-coverage link.

### 2025-03-29-delayed-but-determined.html

[Source](src/content/posts/2025-03-29-delayed-but-determined.html) · [Article](https://www.kerryhatcher.com/delayed-but-determined/)

**Saved search data.** 0 clicks, 3 impressions, 0.00% CTR, average position 10.0.

**Reader and issue.** A family or taxpayer following the settlement needs the two dates and the district’s explanation up front. “Deadline” may read as a statutory determination, while the quoted email describes an estimate.

**Proposed opening, immediately before the district email**

> The district had estimated it would produce records about the J.H. settlement by Friday, March 28, 2025. After repeated calls and emails, I got an update late that afternoon. The district said it needed more time to review the records under student confidentiality laws and that staff would be unavailable during spring break. It now estimated a response by Friday, April 11. Here’s the district’s email:

**Search title** — Bibb Schools Delays Response on J.H. Settlement Records

**Search description** — Kerry Hatcher’s March 2025 update on four settlement records requested from Bibb County schools and the district’s revised response estimate.

**Readability.** Immediately after the quoted email, move the existing “What We Originally Requested” heading and four-item list ahead of the commentary about other requests. Let readers compare the district’s reply with each request.

**Verify.** Check whether March 28 was also a statutory or agreed deadline, how Georgia Code § 50-14-3 applies to the July 18, 2024 vote, and whether any requested material required redaction. Treat the proposed redaction times as author estimates. Retain the historical fundraising language and existing later-update link.

### 2025-03-29-gsdf-patriot-25.html

[Source](src/content/posts/2025-03-29-gsdf-patriot-25.html) · [Article](https://www.kerryhatcher.com/gsdf-patriot-25/)

**Saved search data.** 0 clicks, 26 impressions, 0.00% CTR, average position 13.3.

**Reader and issue** — A reader arriving for photos of a specific exercise gets a generic disaster lead and must pass several images before learning where the author was working.

**Replace the first two prose paragraphs around the opening photos**

> At Patriot 25, I worked as an observer controller at the Guardian Centers in Perry, Georgia. I helped keep the exercises safe, briefed teams on what each simulated emergency was supposed to represent, and gave feedback to teams and trainers.
>
> Federal, state, and local responders trained together. Georgia State Defense Force soldiers searched damaged buildings, worked through dark tunnels and a derailed subway, and practiced rescue at a simulated aircraft crash. The scenarios also included mass-casualty response. The 75-acre urban disaster training facility had flooded neighborhoods and a full-scale stretch of interstate. It felt like the real thing.

**Search title** — Patriot 25 Disaster Response Training in Perry, Georgia

**Search description** — An observer controller’s account and photo galleries from Patriot 25, including Georgia State Defense Force tunnel, flood, and aircraft rescue drills.

**Read mode** — Place “Urban search and rescue,” “Tunnel search,” and the other scenario headings before their heading images in reading order. Add an “In this report” list grouped by scenario, with anchors that preserve existing IDs. Give the linked facility image a named text link, “Guardian Centers training facility,” instead of asking the reader to click the picture above. Keep gallery captions tied to their photo credits.

**Before publication** — Verify the 75-acre figure and whether it describes the whole site or the urban training portion. Confirm the stated agencies and scenario roles, including GBI, the Verizon team, and the U.S. Army. Correct “GDSF” and “crash sight.” Treat the closing look ahead to Patriot 26 as written in March 2025 and check image credits against the albums.

### 2025-04-01-gear-review-system76-pangolin-12-2.html

[Source](src/content/posts/2025-04-01-gear-review-system76-pangolin-12-2.html) · [Article](https://www.kerryhatcher.com/gear-review-system76-pangolin-12-2/)

**Saved search data.** 2 clicks, 139 impressions, 1.44% CTR, average position 12.0.

**Reader and issue.** A Linux laptop buyer needs the advantages the author actually experienced and the trade-offs that matter for the buyer’s setup. The dek sounds like a performance test and the body generalizes from the author’s docking and editing experience.

**Proposed opening**

> After more than a year with the System76 Pangolin 12, I’m glad I traded my heavier rugged laptop for it. Linux worked out of the box for me, I use the built-in ports, and the battery lasts longer in my daily use than it did on my old machine. I still haven’t found a USB-C dock or monitor setup that gives me power, video, and data over one cable. I also miss how easy my old screen was to see outside. Here’s what’s been worth the trade for me.

**Search title.** System76 Pangolin 12 Review After a Year of Linux Use

**Search description.** A long-term Pangolin 12 review covering Linux support, everyday battery life, Steam gaming, USB-C docking, and outdoor screen visibility.

**Read-mode improvement.** In the specification list, group the HDMI and DisplayPort entries under “External displays” and put the power input and USB-C port information nearby. This lets someone checking a dock find the display and power details together. Keep the observed daylight problem in the nearby figure caption and describe the photo in alt if it supplies additional visual evidence.

**Before publication.** Check the exact model configuration and firmware, RAM and Wi-Fi specifications against System76’s linked documentation. Verify supported USB-C power/data/display combinations and the stated compatible monitor. Clarify whether the encoder limitation was specific to a codec, driver, or editor. Present playability and battery life as observed experience.

### 2025-04-02-museum-of-aviation-25.html

[Source](src/content/posts/2025-04-02-museum-of-aviation-25.html) · [Article](https://www.kerryhatcher.com/museum-of-aviation-25/)

**Saved search data.** 0 clicks, 17 impressions, 0.00% CTR, average position 50.6.

**Reader and issue.** A family choosing an outing has to get through generic introductory copy before reaching Kerry’s verdict or the exhibits that make the visit distinctive.

**Proposed opening, replacing the introductory paragraph and bottom-line callout**

> If you get a chance to visit the Museum of Aviation in Warner Robins, go. It’s well worth the time, and you can’t beat free admission. My April 2025 photo tour takes you from the SR-71 Blackbird to the Tuskegee Airmen exhibit. If you’re bringing kids, look for the cockpits and controls they can get their hands on. As the caption puts it, kids love the “airplane house.”

**Search title** — Museum of Aviation in Warner Robins: Photos and Visit Tips

**Search description** — Kerry Hatcher’s photo tour of the Museum of Aviation, from the SR-71 Blackbird and Tuskegee Airmen exhibit to hands-on cockpits.

**Readability.** Move “Plan Your Visit” ahead of the first long gallery. Give the address, hours, admission and parking separate lines. Retain the full gallery and the map, museum and album links. Replace the duplicate location links with one descriptive map link.

**Verify.** Check hours, admission and parking, exhibit count, museum ranking, B-17 and F-117 restoration status, and availability of specific hands-on exhibits. Make clear that the quoted hours and displays are from the visit era pending confirmation.

### 2025-04-09-meet-me-at-the-mall.html

[Source](src/content/posts/2025-04-09-meet-me-at-the-mall.html) · [Article](https://www.kerryhatcher.com/meet-me-at-the-mall/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue** — A Bibb County family looking back at the event needs concrete school and community offerings before facing a long, interleaved gallery.

**Replace the opening paragraph**

> On Tuesday, April 8, 2025, Bibb County School District brought families, students, and community partners to Macon Mall for Meet Me At The Mall. The Northeast High School Band performed, Middle Georgia State University led hands-on CPR demonstrations, and families could find help with Georgia Milestones test prep and sign up for summer camps. The little ones had hula hoops and bubbles, too.

**Search title** — Bibb Schools’ Meet Me At The Mall 2025 in Macon

**Search description** — Photos and highlights from Bibb County schools’ April 8 event at Macon Mall, from student performances to CPR demos and family resources.

**Read mode** — Replace isolated list labels amid the images with H3s such as “Northeast High School Band,” “CPR demonstrations,” and “JROTC drill team,” nested under “Event highlights.” Keep each gallery directly under its own heading. Rename “Click below for the full photo album” to a visible link “Meet Me At The Mall 2025 photo album,” preserving the CC BY 4.0 attribution.

**Before publication** — Check whether the district called it annual. The closing hope that it becomes regular reads oddly against that claim. Confirm the organization names against the event material, and check the empty-alt CPR frame `576A4795.jpeg` for any information its neighbors do not convey.

### 2025-04-16-still-waiting-a-transparency-update-from-bibb-county-schools-and-the-state-superintendent.html

[Source](src/content/posts/2025-04-16-still-waiting-a-transparency-update-from-bibb-county-schools-and-the-state-superintendent.html) · [Article](https://www.kerryhatcher.com/still-waiting-a-transparency-update-from-bibb-county-schools-and-the-state-superintendent/)

**Saved search data.** 0 clicks, 6 impressions, 0.00% CTR, average position 26.2.

**Reader and issue.** Parents following the records dispute need the district’s last known response, the separate state response, and the next step. The fundraising language and the shorthand “state review” may imply an active collection or a formal ruling.

**Proposed opening**

> I’m still waiting for the Bibb County School District’s records about the Alexander II Magnet School settlement. I accepted the estimated charges on March 14, 2025, and the district initially gave March 28 as the expected date. On April 10, its attorney said the district was still reviewing student privacy protections and the settlement’s confidentiality terms. As of April 16, I had no new date. Separately, the state education office said the administrator reassignments were outside its authority. We’ve asked the Georgia Attorney General’s Open Government Mediation Program for help with the records dispute.

**Search title.** Still Waiting for Alexander II Settlement Records | April 2025

**Search description.** Kerry Hatcher recounts Bibb County Schools’ April 2025 records delay, the state’s response on administrator reassignments, and a request for mediation.

**Read-mode improvement.** Consolidate the two identical state-letter links into one labeled “Read the April 14 state education response” and keep it just after Stacey Suber-Drake’s quoted passage. Use “Request for open government mediation” for the following heading.

**Before publication.** Check all dates and attributions against the emails and letter. Preserve the verbatim quotes and the existing note on the unavailable contribution form and unused-funds pledge. Confirm any later disposition before adding it. Treat legal conclusions about disclosure, deadlines, or exemptions as questions pending authoritative review.

### 2025-04-20-in-pictures-a-day-of-action-and-art-in-downtown-macon.html

[Source](src/content/posts/2025-04-20-in-pictures-a-day-of-action-and-art-in-downtown-macon.html) · [Article](https://www.kerryhatcher.com/in-pictures-a-day-of-action-and-art-in-downtown-macon/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue.** A reader who lands on the gallery gets a crowd estimate in the dek and a long run of photos, with little context for the relationship between the speakers, signs and artwork.

**Proposed opening, above the first gallery**

> An estimated 200 people gathered in downtown Macon to protest recent actions by the federal government. I photographed speakers at the lectern, handwritten signs in the crowd, a musician with an acoustic guitar, and an artist at work on a large portrait.

**Search title** — Downtown Macon Protest and Art in Photos

**Search description** — Photos by Kerry Hatcher document a downtown Macon protest, including speakers, signs, live music and a portrait in progress.

**Readability.** Replace “See the full album” and its duplicate card title with one visible link labeled “View Kerry Hatcher’s full Macon protest photo album (CC BY 4.0).” Keep each existing image description and avoid inferring identities or motives from appearance.

**Verify.** Confirm the source of “estimated 200” and the event date. The album title suggests April 19 and the post is dated April 20.

### 2025-05-14-the-road-ahead-2.html

[Source](src/content/posts/2025-05-14-the-road-ahead-2.html) · [Article](https://www.kerryhatcher.com/the-road-ahead-2/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue** — An Alex II parent needs to know what was requested, what came back, and whose interpretation the legal summary represents. The dek’s “ruling” can be read as a court judgment.

**Replace the opening paragraph**

> As of May 14, 2025, we’d received a first batch of redacted emails and some campus-police records about Alex II. The Bibb County School District was still withholding records we’d requested. Our media partners sought mediation through the Georgia Attorney General’s office, and the office encouraged us to pursue enforcement in Superior Court. Below is what we’ve received so far and where we’re following up. Every family deserves to understand how the district responds when children’s safety is at stake.

**Search title** — Alex II Open Records Update | Bibb County Schools, May 2025

**Search description** — Kerry Hatcher’s May 2025 update on the Alex II records request, redacted emails, and campus-police call and dispatch records.

**Read mode** — Under “Campus-Police Call Records,” give Alex II and Springdale their own short list of PDF links. Use school name and record type in each link label, and expand “computer-aided dispatch (CAD)” before the first link so the list makes sense when read on its own.

**Before publication** — Check the AG correspondence and quote or attribute its wording precisely. Revise “ruling” in the dek to match the documented procedural status. Check the date range and what the redacted emails establish about evacuations, violence and district notification. Mark observed omissions as such, and review PDFs for adequate redaction before resurfacing them. Keep the post’s next steps dated May 2025 unless adding a separately sourced update.

### 2025-05-16-investing-in-bibb-countys-future.html

[Source](src/content/posts/2025-05-16-investing-in-bibb-countys-future.html) · [Article](https://www.kerryhatcher.com/investing-in-bibb-countys-future/)

**Saved search data.** 0 clicks, 2 impressions, 0.00% CTR, average position 17.0.

**Reader and issue.** A parent or taxpayer should see the author’s request early and understand that the district’s 3% scenario differs from the 5% raise advocated. The article also interleaves teacher pay with a chart about classified employees.

**Proposed opening, before the existing Ficklin quote**

> In May 2025, I asked the Bibb County school board to give teachers a base salary increase of at least 5% and raise the school millage rate enough to fund it and balance the budget. The district modeled a 3% certified-staff raise. That was one of the options on the table, and I was asking the board to go further. Board member Henry Ficklin put the retention problem plainly when he talked about the 43 teachers who had left that school year.

**Search title.** Bibb County Teacher Pay and the FY2026 School Budget

**Search description.** A May 2025 case for raising Bibb teacher pay, with proposed FY2026 budget scenarios and a worked example of what one mill costs a homeowner.

**Read-mode improvement.** Under “What a mill means for a homeowner,” put the $200,000 example into three numbered calculation steps ending with $80 annually, before exemptions. Give the neighboring-district table a caption with the rate year and a proper header row. Keep the Houston footnote directly below the table.

**Before publication.** Verify the dates and comparability of salary schedules, the Ficklin count, the $6,000 classified health-cost increase, deficit and reserve scenarios, and the millage/LOST claims. The classified salary graphic cannot establish teacher salary ranges. The ACS median is the midpoint of its distribution and the source does not establish that it excludes the top 5%. Verify what the Zillow series measures before calling it a mean or a 5%-trimmed estimate. Check the petition and contact targets before retaining present-tense calls to action.

### 2025-05-29-make-your-voice-heard-on-the-fy2026-budget.html

[Source](src/content/posts/2025-05-29-make-your-voice-heard-on-the-fy2026-budget.html) · [Article](https://www.kerryhatcher.com/make-your-voice-heard-on-the-fy2026-budget/)

**Saved search data.** 0 clicks, 3 impressions, 0.00% CTR, average position 7.0.

**Reader and issue.** A Bibb parent or taxpayer needs the May 23 tentative vote, the two omitted roles and the dated hearings immediately. The article mixes tentative and final language, and multiple figures need reconciliation.

**Proposed opening, replacing the lead**

> On May 23, 2025, the Bibb County Board of Education voted 7–1 to tentatively approve Option C, a $482.1 million FY2026 budget. That version left out two positions I wanted the district to fund: a K–5 English Language Arts coordinator and a truancy specialist. It also left out four proposed job reclassifications. I wrote this before the June 10 and June 17 public hearings to explain why I thought the board should put those items back in the budget. [The Macon Melody’s coverage of the vote](https://maconmelody.com/bibb-school-board-adopts-budget-without-superintendents-requests/?ref=kerryhatcher.com).

**Search title** — Bibb Schools’ FY2026 Budget: What Option C Left Out

**Search description** — A May 2025 look at Bibb’s tentative FY2026 school budget and the case for funding literacy and attendance roles.

**Readability.** Rename “Upcoming Budget Hearings” to “June 2025 budget hearings” and give each hearing its own date-and-time line with the shared venue below. Caption the Option C image “Tentative general fund proposal reviewed May 23” so a reader can distinguish it from the final outcome.

**Verify.** Reconcile the prose’s 16.720 mills for Bibb and roughly 13.3 for Houston with the table’s 14.674 and 11.719. Give the table a source and tax year, then recalculate the two-mill revenue and homeowner examples against the correct base and exemption assumptions. Identify the funds behind $47.02 million versus $85+ million in ending balances. Separate the two roles and four upgrades ($316,804) from the roughly $1.29 million total difference shown in the image. Check the stated June 18 adoption date versus the June 30 deadline, the November 2024 E-SPLOST language written in the future tense, claims about state funding and attendance, and whether the later recap was published.

### 2025-06-03-taking-control-of-your-email-part-1-choosing-a-private-email-provider.html

[Source](src/content/posts/2025-06-03-taking-control-of-your-email-part-1-choosing-a-private-email-provider.html) · [Article](https://www.kerryhatcher.com/taking-control-of-your-email-part-1-choosing-a-private-email-provider/)

**Saved search data.** 7 clicks, 998 impressions, 0.70% CTR, average position 13.2.

**Reader and issue** — A reader shopping for private email needs a practical decision and an accurate distinction between ad targeting, AI features, and what the provider can technically read. The lead and dek present a broad Gmail claim before the author’s criteria.

**Replace the first paragraph**

> My inbox is where password resets, personal messages, and work all land. When I went looking for a new provider, I wanted to know what the company could see, what it did with that access, and whether I could keep using my own domain and the mail apps I already liked.
>
> That led me to compare ProtonMail, Fastmail, mailbox.org, and Mailfence in June 2025. I chose Fastmail for the way I use email. If you need end-to-end encryption, or if your main concern is who can get access to your data, you may weigh the same features differently.

**Search title** — Fastmail vs. mailbox.org and Other Private Email Options

**Search description** — How I compared Fastmail, ProtonMail, mailbox.org, and Mailfence in June 2025 on encryption, custom domains, mail clients, and cost.

**Read mode** — Add a short “Compare the providers” anchor after the opening. Break the seven dense bullets in that section into H3s readers can jump to, beginning with “Custom domains,” “Mail app compatibility,” and “Plans and pricing.” Keep the SPF example in inline code, with wrapping that preserves the literal value on small screens. Keep the Swiss court-order reporting beside the legal example it supports.

**Before publication** — Check Gmail ad personalization separately from Gemini access, training, and user settings, then align the dek with the evidence. Source the CLOUD Act, GDPR, Swiss and Australian claims, and distinguish live mail encryption, storage encryption, ordinary SMTP, and metadata access. Verify prices, entitlements, Bridge and mobile behavior, Fastmail staff access and logging claims, and the warrant-canary and anonymity claims against date-specific provider documentation. Treat paid-tier deliverability as a claim needing comparative evidence and the author’s trouble-free use as a personal report. Check whether Part II has a published destination.

### 2025-06-04-introducing-the-better-schools-brighter-futures-series-learning-from-schools-that-beat-the-odds-2.html

[Source](src/content/posts/2025-06-04-introducing-the-better-schools-brighter-futures-series-learning-from-schools-that-beat-the-odds-2.html) · [Article](https://www.kerryhatcher.com/introducing-the-better-schools-brighter-futures-series-learning-from-schools-that-beat-the-odds-2/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue.** Parents want to know what the series will help them do. The current introduction packs a research finding, a causal interpretation, and local rankings into two long paragraphs.

**Proposed opening, replacing the first two paragraphs**

> What can Bibb County elementary schools learn from schools that beat the odds? In her [2014 Mercer University dissertation](https://galileo-mum.primo.exlibrisgroup.com/permalink/01GALI_MUM/7csvfd/alma991005673073305956?ref=kerryhatcher.com), Jessica H. Garcia studied two high-poverty Georgia elementary schools that did well academically despite challenges such as poverty and frequent student moves. Supportive leadership, high expectations, and a school climate where children felt safe and valued were among the themes she identified.
>
> In Better Schools, Brighter Futures, we’ll use that research as a starting point for looking at Alexander II Magnet School, Springdale Elementary, and other schools in Bibb County. I want parents, educators, and neighbors to come away with things we can try here, from backing up our teachers to helping children settle in when they change schools. We’ll draw on research and reporting from 2014 through 2024. If you’ve seen something work in your school, I’d like to hear about it.

**Search title.** Better Schools, Brighter Futures | A Bibb County Schools Series

**Search description.** A Bibb County series on what parents, educators, and volunteers can learn from Georgia elementary schools that beat the odds.

**Read-mode improvement.** Give the eight previews navigable level-three headings under “What’s ahead in this series?” Keep concrete examples beneath their topics, such as retired reading tutors under community partnerships. A one-line topic index can link to the headings once they exist.

**Before publication.** Check the dissertation’s design and language before describing the themes as causes. Move the #1 and 9/10 claims and comparisons with state scores to a sourced sidebar with the publisher, grade/subject, measure, and date. Verify the tutor program, campus police presence, and which planned series posts were published before updating the signup or “stay tuned” language.

### 2025-06-05-taking-control-of-your-email-part-2-using-your-own-domain-for-email.html

[Source](src/content/posts/2025-06-05-taking-control-of-your-email-part-2-using-your-own-domain-for-email.html) · [Article](https://www.kerryhatcher.com/taking-control-of-your-email-part-2-using-your-own-domain-for-email/)

**Saved search data.** 1 clicks, 391 impressions, 0.26% CTR, average position 9.3.

**Reader and issue.** A person setting up a portable address needs to distinguish registrar, DNS host and mail host before changing nameservers on a live domain. The opening and later Cloudflare reference blur domain DNS hosting with public DNS resolution.

**Proposed opening, before the Part 1 card**

> The reason I like using my own domain for email is simple. If I switch providers, I can keep the address I’ve already given everyone. In this walkthrough, the registrar keeps the domain registered, Cloudflare hosts its DNS records, and Fastmail sends and receives the mail. If you’re moving a domain you already use, check that Cloudflare has the records your site and mail depend on before you change nameservers.

**Search title** — Custom-Domain Email with Fastmail and Cloudflare DNS

**Search description** — Keep your email address when you change providers. Set up a domain with Fastmail, add email DNS records in Cloudflare and test delivery.

**Readability.** In “Cloudflare Example,” lay out MX, SPF, DKIM and DMARC in a table with explicit Type, Name, Value and Priority headers. Put literal strings in code formatting, retain provider documentation links with descriptive names, and label autodiscovery as optional below the table.

**Verify.** Confirm Fastmail’s plan eligibility, record values, DKIM proxy instructions and Cloudflare’s current nameserver/DNSSEC migration steps. Check registrar names and renewal examples. Verify live mail both ways, including receiver authentication results and DMARC alignment. A DKIM signature’s presence alone does not establish a pass, and TTL is not a universal propagation deadline. Qualify the provider privacy and deliverability promises.

### 2025-06-09-better-schools-brighter-futures-literacy-special-edition.html

[Source](src/content/posts/2025-06-09-better-schools-brighter-futures-literacy-special-edition.html) · [Article](https://www.kerryhatcher.com/better-schools-brighter-futures-literacy-special-edition/)

**Saved search data.** 0 clicks, 4 impressions, 0.00% CTR, average position 18.5.

**Reader and issue** — An archived link can still reach Macon-Bibb parents. “Tomorrow” in the dek obscures the year, and the opening risks conflating a proficiency measure with whether children can read.

**Replace the first two paragraphs**

> In June 2025, I asked the Bibb County Board of Education to fund an English Language Arts coordinator for the district’s elementary schools. The position was included in budget Option A, ahead of the public hearings on June 10 and June 17, 2025.
>
> The Macon Newsroom had reported that roughly 18% of Bibb County students were proficient in reading by elementary school. That number is why I wanted the board to hear from parents. We needed someone who could help teachers put reading training into practice and make sure struggling readers got support.

**Search title** — Bibb County’s 2025 Budget Debate Over a K–5 Literacy Coordinator

**Search description** — Why I urged the Bibb County school board to fund an elementary English Language Arts coordinator at its June 2025 budget hearings.

**Read mode** — Move “June 2025 public budget hearings” directly after the opening with both dates, 5 p.m., the Professional Learning Center address, and the original venue link as selectable text. Keep the flyer as a record. Compare its alt text to the adjacent text after the move so a screen reader hears the logistics once and retains any details unique to the flyer. Retain the Macon Newsroom link on its attribution and the separate sources section.

**Before publication** — Verify the year, grades, denominator, assessment, and definition of proficiency for 18% and the comparator’s 37%. Replace “80% of our children not reading well” and comparable wording with the verified measure. Check Atlanta’s trend, any attribution of gains to coordinators, the role in Option A, venue and signup instructions, and any eventual board action before stating the outcome. Date the remaining calls to attend and update the dek accordingly. Use association language for long-term outcomes unless a causal claim is supported.

### 2025-06-11-empty-chairs-and-big-decisions-why-the-final-bcsd-budget-hearing-matters.html

[Source](src/content/posts/2025-06-11-empty-chairs-and-big-decisions-why-the-final-bcsd-budget-hearing-matters.html) · [Article](https://www.kerryhatcher.com/empty-chairs-and-big-decisions-why-the-final-bcsd-budget-hearing-matters/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue.** Residents need to see what the author asked the board to fund and when. “What’s Missing” conflicts with the text saying Option A includes the coordinator.

**Proposed opening**

> When the June 10, 2025 Bibb County school budget hearing began, just one other member of the public was in the room. A few more arrived before I spoke, but you had to sign up before the hearing began. I was the only person to give public comment. I wanted the board to keep the full-time elementary English Language Arts coordinator proposed in Option A. With one hearing left, I wanted more parents in those seats, too.

**Search title.** Bibb County’s June 2025 Budget Hearings and the Literacy Coordinator

**Search description.** A firsthand account of the June 10 FY2026 hearing and why Kerry Hatcher urged the board to fund an elementary literacy coordinator.

**Read-mode improvement.** Rename “What’s Missing” to “What Option A would fund.” Change the later event heading to “The final hearing on June 17, 2025,” and present the original time and location as labeled text. Give the speech document its own “Read my June 10 remarks to the board” link outside the heading.

**Before publication.** Verify attendance, the sign-up rule, hearing details and position against the record. Check what grade, assessment, year and denominator support “one in five.” Some linked sources report on studies and some repeat secondary statistics. Trace the justice-system figures to primary data before carrying them forward and avoid implying causation. Cross-link the later vote coverage if useful.

### 2025-06-13-digital-privacy-and-freedoms-are-under-threat.html

[Source](src/content/posts/2025-06-13-digital-privacy-and-freedoms-are-under-threat.html) · [Article](https://www.kerryhatcher.com/digital-privacy-and-freedoms-are-under-threat/)

**Saved search data.** 0 clicks, 3 impressions, 0.00% CTR, average position 6.3.

**Reader and issue.** A reader trying to understand S.1829 needs to distinguish what the bill says, what EFF predicts and what Kerry believes. A current-status heading and undated appeals to act make a June 2025 snapshot look live.

**Proposed opening, replacing the TL;DR paragraph**

> I want lawmakers to protect children from exploitation online. As a parent, I also believe people should be able to communicate privately. In June 2025, the Electronic Frontier Foundation warned that the STOP CSAM Act of 2025 (S.1829) could pressure encrypted services to monitor private content and push platforms to remove lawful posts. That’s why I opposed the bill. [Read EFF’s analysis](https://www.eff.org/deeplinks/2025/06/oppose-stop-csam-protecting-kids-shouldnt-mean-breaking-tools-keep-us-safe?ref=kerryhatcher.com).

**Search title** — Why I Opposed the 2025 STOP CSAM Act (S.1829)

**Search description** — Kerry Hatcher explains EFF’s concerns about the 2025 proposal and why he opposed its potential effects on encryption and lawful speech.

**Readability.** Retitle “Current Status” to “Legislative status on June 13, 2025” and label the advocacy steps as the original June 2025 call to action. For the linked Salt Typhoon and UN report graphics, add visible captions conveying the point made by each image while retaining the labeled links.

**Verify.** Compare the relevant bill text and actions on Congress.gov before changing status, and check liability, knowledge standards, affirmative defense and takedown claims against that version. Attribute scanning and service withdrawal to forecasts where applicable. Check Apple’s 2021 proposal separately from the UK Advanced Data Protection episode. Verify quotes, comparative claims about Chinese and Russian law, and the status of Signal backups before making factual updates.

### 2025-06-14-no-kings-protest.html

[Source](src/content/posts/2025-06-14-no-kings-protest.html) · [Article](https://www.kerryhatcher.com/no-kings-protest/)

**Saved search data.** The saved report has no row for this URL.

**Reader and issue** — The body opens directly into photos. A reader arriving through a search result or a shared image needs date, place, and what the gallery covers in plain text.

**Add immediately before the gallery**

> On June 14, 2025, protesters gathered in downtown Macon for No Kings. I photographed the gathering, from the signs people brought to the flags they carried.

**Search title** — No Kings Protest in Downtown Macon | June 14, 2025 Photos

**Search description** — Kerry Hatcher’s photo gallery from the June 14, 2025 No Kings protest in downtown Macon, Georgia.

**Read mode** — Add the H2 “Photos from downtown Macon” after the intro. Inspect `576A7091.jpeg` and supply concise alt text if the frame adds something meaningful to the sequence. Keep sign quotations literal and avoid inferring the affiliation of people in the frames from proximity alone.

**Before publication** — Establish the basis for “well over 500” in the dek. If it was the author’s estimate, label it as such. If it came from someone else, name the source. Check whether “peaceful” describes the author’s time on scene or is sourced for the whole event. Keep both claims in the editorial record pending confirmation.

### 2025-06-19-yesterday-and-tomorrow.html

[Source](src/content/posts/2025-06-19-yesterday-and-tomorrow.html) · [Article](https://www.kerryhatcher.com/yesterday-and-tomorrow/)

**Saved search data.** 0 clicks, 3 impressions, 0.00% CTR, average position 7.7.

**Reader and issue.** A reader following the FY2026 budget needs a date, result and next step before the letter and long video. The opening refers to “the items” without naming them.

**Proposed opening, replacing the first two paragraphs**

> On June 18, 2025, the Bibb County school board passed the budget as proposed. Several board members made a last-minute effort to add items we’d been advocating for, but the vote fell along the same lines as it had at the previous meeting. The budget process is over for the year. The work of showing up for our schools is just getting started. I hope you’ll join us at the monthly board meetings.

**Search title.** Bibb County School Board Adopts the FY2026 Budget | June 2025

**Search description.** Kerry Hatcher reflects on the June 18 budget vote, shares an edited meeting video, and publishes his message to the board.

**Read-mode improvement.** Under the existing edited video, add verified chapter links for the budget amendments and vote and the sports equipment contract. Keep the June 19 letter under its own heading and the existing Atom text link visible near the invitation.

**Before publication.** Verify the motion language and vote split against the meeting record and name the amendments once confirmed. Check the video durations and timestamps. Compare “togetherwe” with the sent letter before correcting the quotation.

### 2025-09-01-coding-with-ai-how-real-time-collaboration-transforms-your-workflow.html

[Source](src/content/posts/2025-09-01-coding-with-ai-how-real-time-collaboration-transforms-your-workflow.html) · [Article](https://www.kerryhatcher.com/coding-with-ai-how-real-time-collaboration-transforms-your-workflow/)

**Saved search data.** 0 clicks, 21 impressions, 0.00% CTR, average position 10.3.

**Reader and issue.** A junior developer needs representative tasks and a clear account of who checks the output. The teammate analogy and unconditional benefits can make unreliable suggestions sound dependable.

**Proposed opening, replacing “Introduction” and its paragraph**

> Ever get stuck on an unfamiliar API halfway through writing a function? In this first episode, I look at what happens when you can ask for an explanation or a code suggestion without leaving your editor. That’s what I mean by vibe-coding here. Try a few approaches, ask why the tool suggested a particular one, and check the answer for yourself. You still steer the ship.

**Search title** — Coding with AI, Episode 1: A Guide for Junior Developers

**Search description** — An introduction to in-editor AI questions, autocomplete and multi-step coding tools, with reminders to verify the code they suggest.

**Readability.** Make “Editor Autocomplete” the fourth item in the existing list of tool types. Place a visible “Watch Coding with AI, Episode 1” link beside the titled YouTube embed and verify captions or provide a text summary alongside it.

**Verify.** Check the episode and captions against the article, confirm Episode 2’s publication status before using “next time” as a current invitation, and qualify productivity as a possible benefit rather than an expected outcome.

### 2025-09-02-coding-with-ai-episode-2-supercharging-your-python-workflow-with-github-copilot-ruff.html

[Source](src/content/posts/2025-09-02-coding-with-ai-episode-2-supercharging-your-python-workflow-with-github-copilot-ruff.html) · [Article](https://www.kerryhatcher.com/coding-with-ai-episode-2-supercharging-your-python-workflow-with-github-copilot-ruff/)

**Saved search data.** 4 clicks, 37 impressions, 10.81% CTR, average position 6.0.

**Reader and issue** — A Python developer following along needs to know when Copilot suggests changes, when Ruff changes files, and where the demonstrated tool instructions actually live.

**Replace the two opening paragraphs**

> Welcome back. In Episode 2, I’m pairing GitHub Copilot with Ruff in VS Code. I’ll use comments to give Copilot a starting point, then run Ruff to format the Python files and flag issues I should review. I’ll also show how I set up a pre-commit hook so linting runs when I commit. Read the suggestions and test the code before you keep it.
>
> To follow along from the beginning, set up GitHub Copilot in VS Code and sign in to GitHub. The Ruff installation below uses uv.

**Search title** — GitHub Copilot and Ruff in VS Code for Python | Episode 2

**Search description** — Guide Copilot with comments, use Ruff to format and lint Python, and set up a pre-commit hook in this VS Code walkthrough.

**Read mode** — In “Seeing Ruff in Action,” label the two existing commands “Format files in place” and “Report lint findings” and keep the outcome next to each command as text. Fix the screenshot mismatch under “Guiding Copilot with Comments,” where the text teaches a headlines prompt and the image describes an API user-data prompt. Use a matching screenshot or label it a separate example.

**Before publication** — The prose names `.copilot-instructions.yml` while the screenshot identifies `copilot-instructions.md`. Confirm the exact supported path and scope against GitHub’s docs before changing the sample. Test the pinned `v0.0.258` hook, repository URL, hook ID, and the two uv install paths. Make clear that project instructions alone do not enforce execution. The HTML has no video element or iframe for the announced video. Recover the intended asset and provide captions and a transcript if reinstating it.

### 2025-12-02-restoring-state-funding-for-state-mandated-costs.html

[Source](src/content/posts/2025-12-02-restoring-state-funding-for-state-mandated-costs.html) · [Article](https://www.kerryhatcher.com/restoring-state-funding-for-state-mandated-costs/)

**Saved search data.** 0 clicks, 16 impressions, 0.00% CTR, average position 5.2.

**Reader and issue.** A Georgian trying to understand the local budget impact needs to know who is covered and who pays. The article repeats the central claim and mixes an FY2026 rate with an “upcoming” budget.

**Proposed opening, before “A state decision with big local consequences”**

> Bus drivers. Custodians. Paraprofessionals. Nutrition workers. Front office teams. These are the people who keep our schools running, and their health insurance is one of the state-level costs pressing on Bibb County’s budget. Georgia used to help cover the employer contribution for classified school employees on the State Health Benefit Plan. Local districts picked up the cost when the state stopped contributing. In December 2025, with the January legislative session approaching, I wanted lawmakers to put state funding for that employer share back on the table.

**Search title.** Who Pays for Georgia School Support Staff Health Insurance?

**Search description.** A December 2025 account of how Georgia shifted school support staff health insurance costs to districts and why Kerry Hatcher called for state funding.

**Read-mode improvement.** Group the monthly rate, the 12-month calculation and the resulting annual employer cost under “Cost per enrolled employee.” Give the statewide estimate its own heading and show the assumed enrollment immediately beside it. Label the PDF link “Download the two-sided school health insurance handout (PDF).”

**Before publication.** Verify the phaseout and effective date, the FY2026 rate and appropriation scope, and whether January 2026 decisions concerned amended FY2026, FY2027, or both. Check the $174 million, eligible versus enrolled headcounts, budget and surplus years, ability to opt out, and GaDOE’s exact request. Treat the $1.8–$2.0 billion as a scenario based on assumed enrollment, and distinguish one-time surplus balances from recurring funding.

### 2025-12-11-im-running-for-the-bibb-county-board-of-education.html

[Source](src/content/posts/2025-12-11-im-running-for-the-bibb-county-board-of-education.html) · [Article](https://www.kerryhatcher.com/im-running-for-the-bibb-county-board-of-education/)

**Saved search data.** 0 clicks, 5 impressions, 0.00% CTR, average position 10.6.

**Reader and issue.** A Bibb voter opening the announcement needs the office and seat right away. The office currently appears in an oversized linked H2 after three paragraphs, while the post can be mistaken for an active campaign appeal later.

**Proposed opening, replacing the first three paragraphs and linked announcement heading**

> Yes, I’m running for the Bibb County Board of Education, At-Large Post 7. I’ve spent a lot of time in the audience at budget hearings, digging through spreadsheets and looking up state funding formulas for fun. Somewhere along the way, sitting in the audience stopped feeling like enough. Then more than one of you asked, “so you running?”
>
> [Read my campaign platform](https://www.votehatcher.com/my-platform/?ref=kerryhatcher.com).

**Search title** — Kerry Hatcher’s Bibb School Board Post 7 Announcement

**Search description** — Kerry Hatcher’s December 2025 announcement for Bibb County Board of Education At-Large Post 7 and the priorities that led him to run.

**Readability.** Let the article title serve as the announcement heading. Preserve the former heading’s fragment ID on the announcement paragraph if it has inbound links. Keep the existing campaign destination as a standalone text link and preserve the three platform priorities as H3s under “What I Stand For,” so heading navigation reaches the platform commitments directly.

**Verify.** Source “about one in five elementary students reads on grade level” with the year, assessment, grades, denominator and meaning of “on grade level.” Confirm the campaign’s current status and the signup and contribution links before keeping the closing appeal in the present tense. The proposed opening preserves the December 2025 announcement voice.

### 2026-02-11-trust-then-verify-1-035-reasons-why.html

[Source](src/content/posts/2026-02-11-trust-then-verify-1-035-reasons-why.html) · [Article](https://www.kerryhatcher.com/trust-then-verify-1-035-reasons-why/)

**Saved search data.** 1 clicks, 8 impressions, 12.50% CTR, average position 25.2.

**Reader and issue** — A voter or reporter could mistake the map comparison for an official finding about voter eligibility. The intro states certainty, while the method allows geocoding error and the District 5 count needs a direction defined.

**Replace the opening paragraphs**

> In February 2026, I compared Macon-Bibb’s voter registrations with the county’s commission district maps. I flagged 1,035 records across all nine districts where the listed district differed from the district I mapped the address to.
>
> Some addresses, especially near a boundary, may have landed in the wrong place on the map. With the District 5 special election scheduled for March 17, 2026, I shared the results with county officials and called for an independent audit. If someone’s registration really did put them in the wrong district, it could affect which race appeared on their ballot.

**Search title** — Macon-Bibb Voter District Map Review Before the 2026 Special Election

**Search description** — How Vote Match flagged 1,035 possible Macon-Bibb commission district mismatches, what geocoding can miss, and why I called for an audit.

**Read mode** — Before the interactive map, add a text summary of what each static map shows, including the District 5 examples and the distinction between a listed district and a mapped district. Give the iframe the title “Interactive map of potential Macon-Bibb commission district mismatches.” Review the map link and embed together so keyboard readers and print readers can understand the result from the surrounding text. Keep the original captions and source links.

**Before publication** — Define what the 540 counts (registered in District 5, mapped into District 5, or involving it in either direction), then use that definition everywhere. Reconcile “at least” and “likely higher” with both exclusions and possible false positives. Confirm source snapshot dates, boundary version, vote tally, and date of the initial email. Keep the organizer’s quotations verbatim and verify the account of the hack and JARVIS independently before treating it as established or causal. Check what information each public map exposes before promoting its link, and frame “March 17th Is Coming,” the dek countdown, and voter instructions as February 2026 context. A current outcome requires a dated, sourced update.

### 2026-05-27-out-of-runway-the-fy27-bcsd-budget.md

[Source](src/content/posts/2026-05-27-out-of-runway-the-fy27-bcsd-budget.md) · [Article](https://www.kerryhatcher.com/out-of-runway-the-fy27-bcsd-budget/)

**Saved search data.** 0 clicks, 2 impressions, 0.00% CTR, average position 5.5.

**Reader and issue.** A Bibb taxpayer needs the deficit, the purpose of the cut list, and which decisions were still open on May 27. Both model results and the author’s estimates appear as if they came straight from the same presentation. June 2 is variously called tentative and the point at which the deficit was locked in.

**Proposed opening, before the embedded work session**

> I sat through the Bibb County Board of Education’s May 21, 2026 budget work session and left less encouraged than I went in. The May 14 tentative FY27 General Fund budget showed a $23.8 million deficit with no change to the school millage rate. On May 21, Dr. Sims’s team walked the board through what it could cut if it had to. The team explicitly said it did not recommend those cuts.
>
> Here’s how I read the trade-offs the board was facing heading into the June 2 tentative adoption date. The board could still make changes before final passage, and the tax digest could change the revenue math. You can watch the full May 21 session below.

**Search title.** Bibb County FY27 Budget: The $23.8M Gap and Two Paths

**Search description.** A May 2026 analysis of Bibb County schools’ tentative budget, potential cuts, reserve projections, and estimated homeowner costs.

**Read-mode improvement.** Put the two estimated paths in a text table directly after the district’s millage scenarios, with columns for added mills, modeled cuts and monthly cost on the example median home. Label the district table and the author’s side-by-side estimate separately. Once equivalent text is adjacent, shorten the full infographic alt to identify the summary and direct readers to the table.

**Before publication.** Reconcile the May 14 tentative budget wording with the June 2 timeline and verify the June 18 hearing date and outcomes before adding any retrospective note. Confirm whether the roughly $5.4 million per mill shorthand and both endpoints use the same digest and baseline as the district scenarios. The listed cuts add to about $15.9M using the rounded entries and may overlap, particularly redistricting and consolidation. Check the underlying cut totals, whether options can be combined, the cash/reserve benchmarks, retirement eligibility and state intervention claims. Verify the ACS vintage, historical rollback counterfactual, and the FY26 fund-balance attribution. Label all projected figures as of the source deck date.
