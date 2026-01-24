# Whose Job Is It?

A while ago, a message appeared in our Slack channel. It was a small bug found in production—it only occurred under specific conditions, so it wasn't having a big impact on the service right away. But the problem was that it wasn't clear which team's territory this bug belonged to. It occurred somewhere on the boundary between frontend and backend, precisely at an ambiguous point in the API spec both teams had agreed on.

After the message was posted, no one responded for about 30 minutes. The "read" count kept increasing though. I also hesitated for a while after seeing that message. 'Is this our team's job? Or the other team's?' Eventually, after about an hour, someone cautiously asked: "Who should look at this?"

## Important But Not Important, Yet Someone Has to Do It

In service operations, situations like this happen more often than you'd think. Not an important feature, not urgent, but definitely something someone has to handle. A typo in a customer service response, incorrect information discovered on the internal wiki, old data piling up in the test environment. These things don't immediately stop the service or directly affect revenue.

But when these small things pile up, the service gradually ages. More importantly, how the team handles these things eventually becomes the team's culture.

As a developer, I've experienced this countless times. Especially after becoming a team lead, I encounter it even more frequently. Every time I see team members cautiously asking in Slack, every time someone asks "Is it okay if I do this?", I often feel a bitter emotion.

## Whose Job Should It Be?

"Whose job is this?"

It's a very simple question. But it's also a very delicate question to answer. Those who can easily answer this question are probably one of two types: people who genuinely think it's not their job, and people who just do it as if it were their own.

If you're watching others' reactions and can't answer, that's a somewhat bitter situation. It's clearly something that needs to be done, but because it's unclear whose job it is, everyone just watches each other. In this situation, it's easy to say "take initiative." But this phrase becomes relative the moment you say it, precisely because of the word "initiative."

Because everyone has different standards for what initiative means.

## The Limits of the Word "Initiative"

Last year, I had a conversation with a team member. In my view, they were someone who worked quite proactively, but they themselves felt they lacked initiative. "Other people work so much more actively than me. I'm still far from that."

In that moment, I realized: "initiative" is a hard concept to measure. For some people, going even slightly beyond their work scope feels proactive. For others, only solving team-wide problems feels proactive.

The bigger problem is that "take initiative" can sound like a demand for unlimited responsibility. Should I do things that aren't my job too? Where does initiative end and where does it become excessive? While pondering these questions, you end up doing nothing.

## People Who Just Do It

So what should we do? Should we create clear standards? "This type of work is Team A's, that type is Team B's"—would defining it like this help?

In my experience, even if you create such standards, boundaries eventually emerge. And at those boundaries, the same problems occur. What I've observed across multiple teams over about 6 years is that well-functioning teams have something in common: they have "people who just do it."

"People who just do it" don't ask questions like "Is it okay if I do this?" Instead, they say: "I handled this." Or "Let me take a look at this."

They're not people with especially strong initiative or outstanding abilities. They're just people who, when there's something to be done, do it. Of course, they don't unconditionally do things that really aren't their job. But if it's something someone has to do and the owner is unclear, they handle it without overthinking.

I try to be that kind of person too. Not perfect, but at least I tend to raise my hand first when these things happen in the team. About 3 years ago when I was on the backend team, I discovered a small bug on the frontend side. It wasn't my job at the time, but it looked like 30 minutes would be enough to fix. So I just fixed it. Shared it with the frontend team and opened a PR.

After that, collaboration with the frontend team became much smoother. They also started raising their hands first when they found small problems on the backend side. Without anyone going first, we naturally started working across each other's territories.

## But It Shouldn't Become Exploitation

There's an important point here. Saying "be a person who just does it" doesn't mean take on all the work. This shouldn't lead to exploitation.

In some teams, when a specific person keeps handling these things, an implicit expectation forms that "this person does these kinds of things." Then the "person who just does it" takes on more and more work, eventually reaching burnout.

What's needed is for the whole team to create a "culture of just doing it." Not one person handling all boundary work, but whoever has the capacity at the time, or whoever can do that work best, naturally raising their hand. And the team recognizing and appreciating that behavior.

In our team, we share these things during weekly retrospectives. "Someone handled this this week." And we express gratitude to that person. It's a small thing, but when these accumulate, it becomes a "culture of just doing it."

## The Attitude That Keeps Services Alive

Ultimately, the attitude needed for service operations is this, I think. The answer to "Whose job is this?" becomes "Someone has to do it, so I'll do it." And people with that attitude gather to create a team that naturally handles necessary work without exploiting each other.

As a development team lead, I try not to tell team members to "take initiative." Instead, I try to show that example first myself. When something with unclear ownership comes up, I raise my hand first. And when a team member handles such a thing, I always recognize and express thanks.

Of course, it's still hard. Sometimes I think "Do I really have to do this?" and sometimes I worry if team members are taking on too much. But in those moments, I think: we're not just making code—we're making a service, and a service is the sum of these small things.

If it's something someone has to do, it doesn't matter who does it. What matters is that the work gets done, and in that process, we respect and appreciate each other. I believe teams built that way ultimately make better services.

That bug that came up in Slack a while ago—I ended up fixing it. It took about 30 minutes. And after that, one team member said this: "Because you do it first, I feel like I can do these things without burden too." Those words felt really good.

We're not a perfect team yet, but I feel like we're getting a little better. As "Whose job is this?" questions decrease and "I'll do it" answers increase.

<!-- dev-to-id: 3195316 -->
<!-- dev-to-url: https://dev.to/manager_log/whose-job-is-it-2l29 -->
<!-- dev-to-published: true -->
