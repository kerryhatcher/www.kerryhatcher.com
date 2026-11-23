# Humanizing the archive

The older posts should sound as if Kerry is writing at the time of publication. Start with the original draft and listen for how Kerry opens a story, describes a problem, credits someone, or tells the reader what to do. Keep the facts, code, links, dates, and qualifications intact.

## What has helped so far

- **Bring back the author’s opening move.** The EBS post originally started with a server already running and a disk that needed preparing. The network-drive post started by thanking aejw. Both openings gave us a better starting point than a newly written summary.
- **Describe the task in the reader’s terms.** In the Active Directory post, “Give it the group name” gets the reader to the function’s input faster than a description of “the account running the code.” Keep the precise lookup method where it helps explain what the code does.
- **Keep the problem that sent the author looking.** The RHEL post works as a short story about PyCharm complaining, Fast Track coming up empty, and finding `git18`. The sequence gives the technical details a reason to be there.
- **Keep observations tied to the author’s setup.** In the Jenkins post, “So far it doesn’t look like it updates anything besides Jenkins” keeps the uncertainty in the original observation. Name the repository and keep the advice to try it in a VM before using it on a server someone depends on.
- **Show one ordinary example.** The first CDN rewrite still scored 100% AI only. The next pass put a reader in front of a photo and showed what happens when the CDN already has a copy. The example made a cache hit easier to picture.
- **Give present-day guidance its own place.** Keep compatibility and safety advice in a labeled archive note when the original article needs it. The EBS note keeps the warning about formatting the wrong disk and points readers to the AWS instructions for a current instance.

- **Start with a measurement when the post already has one.** The DNS post is easier to follow when the reader sees a lookup take 283 ms and the download take 124 ms before learning what DNS does. The timings give the distinction between lookup speed and throughput some stakes.

- **Give a photo essay a reason to start looking.** The crossover opening points readers to the bridge and says what it means. The awards section can then introduce the people and the order of events.

## Successful GPTZero flips

These are excerpt-level results from `nobotrs analyze --gptzero`. The percentages are GPTZero’s scores for the displayed classes. Short excerpts can vary between runs. The results describe the passages tested and give us observations to compare in later edits.

| Post | What changed | Before → after | Accepted commit |
| --- | --- | --- | --- |
| [Format and Mount EBS in Ubuntu](src/content/posts/2011-05-03-format-and-mount-ebs-in-ubuntu.html) | Restored the original setup and moved the disk-formatting warning into the archive note. | AI only 100% → Human only 99.4% | `a6ceeba` |
| [Jenkins/Hudson on Ubuntu 10.04 LTS](src/content/posts/2011-06-01-jenkins-hudson-on-ubuntu-10-04-lts.html) | Restored the conversational lead, named the Debian package repo, and tied the tentative update observation to Kerry’s server. Three successive drafts scored 99.98%, 99.83%, and 99.28% Human only. The third kept the clearest qualification. | AI only 90.4% immediately before those rounds → Human only 99.28% | `18e16a1` |
| [Check Active Directory Group Membership in C#](src/content/posts/2012-03-15-c-net-check-if-user-is-in-active-directory-group.html) | Addressed the reader directly and explained what to pass to the function before describing the lookup. | AI only 100% → Human only 97.7% | `87de0ca` |
| [Mounting Network Drives with C#](src/content/posts/2012-03-20-mounting-network-drives-with-c-net.html) | Restored the thanks to aejw and explained the helper from call to result. | AI only 100% → Human only 77.2% | `c084347` |
| [Install Git 1.8 on RHEL 6](src/content/posts/2014-05-26-install-git-1-8-on-rhel-6.html) | Put PyCharm’s complaints and the unsuccessful Fast Track search back at the center of the opening. | AI only 100% → Human only 72.0% | `c084347` |
| [Save Money and Protect Your Site with a CDN](src/content/posts/2020-05-07-save-money-protect-your-site-with-a-cdn.html) | Replaced a generic explanation with an example of a reader requesting a photo that the CDN already has. | AI only 100% → Human only 96.3% | `c084347` |
| [Make Your Internet Faster and Safer for Free](src/content/posts/2020-05-08-make-your-internet-faster-and-safer-for-free.html) | Two definition-first drafts still scored 100% AI only. The accepted draft opened with the actual Firefox timings and used them to introduce DNS. | AI only 100% → Human only 91.0% | `5d3e476` |
| [Better Python Logging](src/content/posts/2025-03-07-better-python-logging.html) | Restored the joke about overusing `print()` and showed how another failing run leads to another debug print. The output captions point readers to message context while explaining why totals vary. | AI only 100% → Human only 68.4% | `5d3e476` |
| [Crossover 2025](src/content/posts/2025-03-07-crossover-2025.html) | The first rewrite retold the ceremony and overlapped the awards section. The second invited readers into the photo essay and explained the bridge. | AI only 100% → Human only 99.3% | `42d3142` |
| [Using Rust to Make Python More Manageable](src/content/posts/2025-03-10-using-rust-to-make-python-more-manageable-2.html) | Restored the joke about the author’s favorite Python tool and told readers where to find the environment after running the commands. | AI only 60.6% → Human only 99.98% | `42d3142` |
| [Focusrite Scarlett Solo Review](src/content/posts/2025-03-13-gear-review-focusrite-scarlet-solo.html) | The first rewrite still read like a product summary. The second followed the battery and durability problems through to the cable swap the author uses for work. | AI only 100% → Human only 80.7% | `42d3142` |
| [Delayed but Determined](src/content/posts/2025-03-29-delayed-but-determined.html) | Opened with the missed Friday estimate and the author’s calls and emails. Kept the district’s explanation attributed and its new date tentative. | AI only 100% → Human only 57.8% (low confidence) | `42d3142` |

## Mixed to Human only

- [It’s Time to Switch to a New Email Provider](src/content/posts/2020-05-11-its-time-to-switch-to-a-new-email-provider.html) moved from Mixed (99.6%) to Human only (65.8%, medium confidence) in one follow-up round. The password-reset opening returned to the author’s original question, and the postcard analogy showed what changes when two mail servers encrypt the connection between them. The same five paragraphs were scanned before and after. Accepted in `67519dc`.

## Adding a new entry

Whenever a revised excerpt moves from **AI only** to **Human only** and the edit is kept, add a row with the post link, the concrete change, the two results, and the accepted commit. Use the same passage boundaries on both scans. If an archive note was part of the first excerpt, include it in the second. Record an intermediate round when it helps explain why the next edit worked better for the reader. Add a lesson above when the example reveals something new about the author’s voice or the material.

Before keeping a draft, check its claims and qualifications against the original, read it as part of the full post, and verify the changes in the rendered article. When several drafts read well, keep the one that best preserves the author’s meaning and voice. GPTZero scores describe the detector’s response to a particular excerpt and can vary even when the text stays the same.
