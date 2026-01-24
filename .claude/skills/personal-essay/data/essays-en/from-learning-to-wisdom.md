# From Learning to Wisdom

A while ago, I had drinks with former colleagues. After a few drinks and various conversations, a senior developer brought up something like this: "These days I wonder if the system I built is really right. The initial requirements were clearly not this, but as conflicting features and policies kept being added, now users have to use it in ways they never imagined."

Then a junior said cautiously: "Actually, I was always confused when submitting PRs for that system. I wasn't sure if I was using it right, but I'm glad we're talking about it today." After that, we continued talking about how each person prefers to build things, what development approach would have been better for those requirements. Conversations that would never have happened in an actual development meeting room started flowing freely at the bar.

On my way home, I suddenly thought: Why can't we talk like this in the meeting room?

## Knowledge Accumulates, But Wisdom Is Different

Learning presumes acquiring knowledge. We accumulate knowledge by reading books, attending lectures, writing code. But having a lot of knowledge doesn't mean wisdom follows.

I had a similar experience. Around my third year as a developer, I thought I knew and could do quite a lot. I knew design patterns, algorithms, and had frameworks I could handle proficiently. When I took on a new project, I mobilized all that knowledge to quickly build a system. Completed it in 4 months and was proud. It was a CMS that implemented a Seoul map in Flash (before Naver Maps existed) showing registered real estate listings for each district.

But as the service operation started, requirements grew day by day. Operations people were suggesting and presenting requirements in ways I never expected. I managed to implement them somehow, but dependencies between modules broke, causing unexpected errors and constant new issues I'd never seen. Eventually, watching things not work as originally intended, I got angry.

'Why don't they use it as intended, as originally requested?'
'If they use it this way, of course problems will occur. People are so stupid.'

For 6 months—longer than the development time—I blamed users while fixing bugs. Having to test directly to fix bugs, inevitably becoming a user myself, testing feature operations one by one, I suddenly realized:

'With this implementation, of course there's room for misunderstanding and problems.'
'Ah, I've been making garbage.'

Development is the process of creating something from nothing, and I think any developer with sufficient knowledge can create any feature shown in production, given the right conditions. But the seams and craftsmanship differ for each creator. Results that merely copy and imitate based on knowledge clearly have limits at some point. Eventually, the process of making it your own is needed, and that's when wisdom to distinguish right from wrong develops, I think.

Thus, what's essential for knowledge to transfer to wisdom is execution. But simply executing isn't enough.

## Starting to Understand Users and Myself

After that realization, my questions changed. "How can people use this without misunderstanding?" "How can I make them use it one more time?"

Technology came after that. Knowledge overflows everywhere in the world, and implementation is no longer a difficult task based on it. With AI help, code can be written anytime. Sometimes it produces results far better than mine. But building a service that people actually use required a slightly different approach.

So I started observing the service and the people using it. That's also why I suggested the CX team shadowing program. How do users use it, where do they get lost, which features do they look for most. Even for the same feature, usage methods differed by organization, policies differed, and attitudes toward people differed. So I tried different approaches and solutions for each changing organization.

I definitely grew through my own problem-solving methods. I started getting a sense of which choices and technologies to use in various situations. But there was a blind spot. I wasn't reflecting on or introspecting about my execution.

I still remember. Around my 8th year, I was doing an ad system renewal project, and during a design review, a junior asked me:

"Our system is memcached-based, why are we using Redis for this project?"
"When building something new, if we don't try it at times like this, when will we?"

In a company, how I'm perceived as a person ultimately comes from my accumulated choices. In that sense, it was a rather immature answer. A naive answer from when I was infatuated with new things, without clear standards or rationale.

From then on, whenever projects big or small reach a conclusion, I do retrospectives as soon as possible. I intentionally exchange questions like "Was this development approach ultimately right?", "Given current requirements, how should we have developed?", "How are users using it?", "If I did it again, what opinions could I offer?" Making it a routine improved my ability to accept both positive and negative feedback. I could then choose with much clearer rationale in the same situations afterward.

I end each day with a cup of tea with my wife before bed. That's naturally become my daily retrospective time. Talking about issues and topics from the day, I look back at what situations were like. I usually aim for honest conversations, so I tend to speak impulsively and regret often. Since mistakes are proportional to the words I speak, I often think and resolve to reduce my talking. Then recently, during a conversation with my wife, I realized something: it's not that I make mistakes because I talk too much, but "because I haven't developed the habit of conversing wisely enough." For me, it was a goosebumps moment.

Like this, if we start trying to look at the essence of problems objectively, I think we can definitely live today differently from yesterday. I hope you also create a routine of mulling over and organizing why you did things that way, why you made those decisions and took those actions.

## The Courage to Acknowledge My Ignorance

But there was another trap here. As my judgment criteria built through experience and reflection became more established, it became harder to accept different opinions. Thoughts like 'I've already gone through this case 3 times, and you're doing it for the first time' started appearing.

The decisive moment was when I immediately rejected a method proposed by a junior. "That method won't work. You're using RDB but want to serialize data with null true without normalized table design—do you really think that's right?" But that junior didn't give up and came back with a prototype. In the end, there were no problems. Because it wasn't a service storing large amounts of data.

I didn't show it, but I was angry and embarrassed. The situations where I didn't sufficiently listen to the other person's opinion, trapped in my experience and continuing the conversation, were shameful. I felt then that as experience accumulates, there's actually a risk of falling into narrow thinking.

People who don't fear the collision of knowledge, who acknowledge that their experience not based on the situation could be wrong, who can endure and accept the process that occurs from openly exchanging opinions—they're more likely to become wise. It's time for the courage to admit that we could be wrong, that due to individual differences in knowledge, we might not know at any time, and that it's okay to say we don't know. I want to become like that.

## An Environment Where Opinions Can Be Exchanged

So how do we freely exchange opinions? Actually, exchanging opinions isn't possible in every situation just because I want to. There needs to be another party for opinions to flow.

I feel this in every meeting of 5+ people, wherever I go. There are specific people who dominate the atmosphere and do all the talking in meetings. They say "feel free to share opinions" but usually no one speaks. Why do we repeatedly experience this pattern? How can free communication happen?

Psychological safety. This keyword originating from Harvard Business School Professor Amy Edmondson is cited as a very important factor in operating organizations. It refers to an atmosphere where any talk is okay, where trust, comfort, and naturalness coexist, and in such an environment, constructive conversations are more likely to be handled well.

But if misunderstood, it can become one-sided and cause much disappointment. When I first tried to create psychological safety, it was the same. I led conversations with "I'm on your side. You can tell me anything, good or bad," but in reality, I was guiding toward the direction I wanted.

Real psychological safety isn't one-sided permission. It's an environment where even if a junior opposes a senior's opinion, that opposing opinion is respected and seriously considered. A place where mistakes aren't criticized but treated as learning opportunities. A place where honestly saying you don't know doesn't get you dismissed.

How much do we embrace our colleagues' mistakes and cover for them as if they were our own? How often do we raise objections in vertical decision-making processes, ask about intentions, work toward understanding and persuasion?

## What Understanding People Means

But the hardest part of all these processes was something else. It was understanding people.

First, you have to invest a lot in getting to know people, and this isn't an area of knowledge that someone can just teach you or guide you through.

Some team members want direct feedback; others need time to realize things themselves. Some people learn through failure; others become more cautious because they fear failure. The same words motivate some while others feel pressured.

I didn't learn this from a manual. Over 10+ years managing dozens of people, I came to understand bit by bit through countless trial and error. Even now, when new team members join, I start learning again from the beginning.

What I've come to think now is that immersion and tireless consistency are important. That's also my style. I can't completely separate work and life. I'm easily distracted and have weak focus. So I think while eating, think while on dates, think while spacing out.

That way, everything sometimes suddenly flashes by, and occasionally when I experience a thrilling insight, I feel elation. There are many nights when ideas suddenly come and I jot them in a notebook. This writing is the same. I'm not writing this because I decided to write this kind of essay. This is how I've worked.

This approach doesn't fit everyone. It's hard to recommend to people who feel disturbed by work when resting. So I spend a lot of time observing and analyzing individuals. Because my method could be wrong.

With one team member, it took 2 years. At first, my feedback style didn't suit them and the relationship was awkward. But through continuous conversation and gradually changing approaches, at some point we came to understand each other. That process was definitely not something that could be learned as knowledge.

One genuine conversation where you immerse yourself in someone and genuinely try to understand them teaches far more than reading "listen" and "empathize" a hundred times in books. That was my method of learning, and through that knowledge, I think I've been able to continue managing until now.

## Still Learning

I still don't know many things. New technologies keep coming out, team situations keep changing, and people each pursue different things. In the past, this would have made me anxious. Thoughts like 'I'm a senior but shouldn't I know this at least.'

But now I know. Wisdom comes not from knowing everything, but from the attitude of acknowledging what you don't know and continuing to learn.

Knowledge accumulates, but wisdom doesn't accumulate. Wisdom gradually grows through the endless process of executing knowledge, reflecting, colliding with different opinions, acknowledging your inadequacies, and trying to understand the subject.

What stage are you at? Accumulating knowledge, executing, or reflecting? Any stage is fine. What matters is not stopping this routine.

I've rambled about my experience that understanding people, growing together, requires putting yourself down accordingly, and requires continuous time and attention.

Why not try this at your next meeting? Honestly saying "I don't know this part well." That one phrase can create psychological safety in your team and enable better exchange of opinions.

The journey from knowledge to wisdom is hard alone. It becomes possible only when we're with people who share opinions together, acknowledge each other's ignorance, and keep learning. I hope you have such colleagues, and I hope you become such a colleague too.

<!-- dev-to-published: false -->
