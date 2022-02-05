import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DbService } from './db.service';

export interface Story {
  id?: string,
  address: string,
  text: string,
  day: number,
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  stories: Story[] = [
    {
      day: -12, address: "0x3ec0071fd8522e55b66de4c2a1a3b57e07e6b183de5360dcd98bb829bf5ae200",
      text: `I remember bits and pieces of a tale my pops once told me. They almost succeeded to eradicate those memories, but some have stuck. The tale was about the early days of the decentralization. The early days of change from what once was primarily a capitalistic society. Back then many people believed in a glorious future based on decentralized decision making powered by predefined rules and voted on by anyone. According to him the early days actually worked very well. Ideals and values prevailed in the new structures that emerged. Its hard for me to believe. Knowing what I know from my lifetime, or at least the parts I remember. These days votes seem to be a tool they use to keep us down, a tool to overwhelm us.`
    },
    {
      day: -11, address: "0x3ec0071fd8522e55b66de4c2a1a3b57e07e6b183de5360dcd98bb829bf5ae200",
      text: `In theory we all had the ability to change the system if we didn’t like it. But in reality that ship had long sailed. What could my measly 14M tokens change in the thousands of votes that were happening every day with an average participation of 3.8 yotta-votes? Nothing is what. Just like before, most of the power was controlled by a few groups. They say every vote was anonymous, but we all know someone who used to vote more idealistically only to have mysteriously disappeared shortly after.`
    },
    {
      day: -10, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `Of course, I hated having to enforce the new order; having a hand in helping to oppress the citizens of our region, myself included. The thirteen years it took to move up in this world were filled with self-doubt and loathing. There were times when it hit me harder than others. Some days, I could rationalize that I had to do what I needed to in order to survive. Other days, I felt like I couldn't even be mad if a rogue anarchist tried to assassinate me on my way to work. And sometimes I even hoped for their success.`
    },
    {
      day: -9, address: "0x3ec0071fd8522e55b66de4c2a1a3b57e07e6b183de5360dcd98bb829bf5ae200",
      text: `*pfiieeeeeep...* went the kettle in the other room. I was blessed to have two rooms as a single male in todays world. Usually someone like me got only a single room in the buildings which used to be large apartment complexes in the projects. They were all converted to maximum efficiency habitation units. Their resemblance being much closer to chicken coops than apartments. However, working for the new order had small upsides. It took me 13 years of obedience and blind execution of everything I was told, but last year they moved me out of my 8ft x 8ft room into this double room unit. No, there was no kitchen, no bathroom, and not much of anything. There was one room with a bed, and another with a table, a single chair, the kettle and a hole in the wall with a rubber plug, just big enough to urinate into it. I even had to bring in the water for the kettle in bottles I’d fill up outside on the spigot. It has become the highlight of my days to make myself a cup of tea in the evenings to wind down before the monotony started again the next day.`
    },
    {
      day: -8, address: "0x3ec0071fd8522e55b66de4c2a1a3b57e07e6b183de5360dcd98bb829bf5ae200",
      text: `It’s 5 in the morning as I walk up to the big black brick building on Center Ave. The Uniformist HQ. The place where everyone worked that was in charge of, or tasked with the enforcement of anything that had to do with an individuals “image”. From their clothing to their hairstyles and everything in between. Mainly there were two roles. Appearance architects and wardrobe supervisors. Of course the AAs reported to the higher ups, but I had no idea who they were as a low level wardrobe supervisor. After checking in, I retrieved my stack of sheets to be handed out today. I usually had the same route assigned and liked most of the families on the route. They were good people, and I hated to have to force them into this ridiculous mold, but what choice did I have? The first house was only 5 blocks away from Central Ave. Its the house of the Hagendorfs. Sharon and Marvin Hagendorf and their kids. Approaching the door, I put on a smile and act like everything is juuust peachy.`
    },
    {
      day: -7, address: "0x53143A1404277d27EF7007751739ce950896A3c2",
      text: `As the door rang, I went to check who it was. A cold shower ran down my spine, as this was usually not a good sign. Today it was our assigned wardrobe supervisor with the mandatory dress-code sheet for this month. I thought to myself how ridiculous this was, but didn't even dare to speak it out loud. I knew that Fred was just here to do his job, so I greeted him with a fake smile, trying to make it look as real as I could. I knew him for a long time and he was telling me with a roll of his eyes that he knew how stupid this whole charade was as he handed me the sheet.`
    },
    {
      day: -6, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `Every day there seemed to be more rules. How we could behave, how we could dress, who we could speak to. There was nothing in which we had autonomy anymore. I knew there were people struggling. In fact, there probably were very few who weren’t. But we couldn’t even talk about it with one another. The coping tools we used to be able to use would now get us executed or locked away. Whenever I began to feel the pressure of the crushing hopelessness this world was instilling in us, I closed my eyes and remembered the richest memories of my own humanity. Meals with flavors we hadn’t tasted in years, random acts of kindness, the joy of dancing along to live music: these were the things that I had etched into my brain to keep myself sane in a world that no longer made any sense.`
    },
    {
      day: - 5, address: "0x53143A1404277d27EF7007751739ce950896A3c2",
      text: `Today our neighbor shot himself. I didn't even know his name. All I know is, that he lived alone and probably couldn't endure the torture they put us through. The shot woke us up, but we were not allowed to react anyways, so we continued our routine throughout the rest of the day. By the time I got back from work they had all the mess removed and another couple was already living in our neighbors apartment. Their names will remain a mystery too. I am sure of it! Things move so fast, since they took control over our lives.`
    },
    {
      day: - 4, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `Most days unfolded exactly the same. All the households on our block awoke at 6am to the universal alarm. We ate a breakfast of eggs and toast with our families, dropped the kids at school and then headed to work where we stayed until 5 pm on the dot. We didn’t leave for lunch. School classes ended at 3:30, followed by “Preparedness Training” so that our children had no time unaccounted for. There were no such things as sports or electives, all students received exactly the same education and training and were expected to perform on an equal level at all times.`
    },
    {
      day: -3, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `I stepped down from the porch and instinctively touched my breast pocket to make sure my keys were safely inside. Crap. It was empty. Without thinking, I turned on my heel and reached toward the doorknob. A tone sounded in my ear followed by a familiar robotic voice. “Variance detected. Please continue on your route as planned.” Double crap. Everything was supposed to be planned. We were supposed to have been trained by now not to forget things like house keys and setting alarms. We were told that the more times we repeated the same behaviors, the more predictable our lives would become and the safer we would all be. But our humanity couldn’t always be planned. They didn’t understand that mistakes were part of who we are, part of what makes us fallible, mortal humans.`
    },
    {
      day: - 2, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `Sometimes I thought the lockdown was for the best. That the powers-that-be were just trying to protect our families and ensure the continuation of our species. But every once in a while I couldn’t help but think of the way it used to be. When we weren’t tracked going to and from work and monitored constantly for indications of treason. When we could talk about the future and the government over dinner without fearing armed soldiers breaking down our door. `
    },
    {
      day: -1, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `I sighed as the long line of mini vans curled around the side of the school building, each child taking their turn being ushered from their parent’s car by an eager crossing guard. They went straight from the protection of their legal guardians to the protection of the school’s staff, delivered from their homes to the four walls of the school like delicate and precious artifacts that couldn’t face the elements for fear that they would shatter. Of course, they *were* precious, but so much had changed in the last two decades it was impossible not to revel in the stark differences of the times. `
    },
    {
      day: 0, address: "0x0000000000000000000000000000000000000000000000000000000000000",
      text: `When we were young, we rode bikes daily.`
    },
    {
      day: +1, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `We rode our cruisers the 1.5 miles to the elementary school in the morning, then took our time making our way back home once the final bell rang. Our parents didn’t check in unless we failed to show up at 6:00 on the dot for dinner. Most often, we would ride down to the creek where we would skip stones and make potions with the various organic matter we would find gurgling over the rocks. `
    },
    {
      day: +2, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `I still remember the time I missed curfew. I never made that mistake again. Robbie and I had found a clump of eggs clinging to the side of the creek’s bank. Worried that they would be swept away and we wouldn’t get to watch the tadpoles develop over the coming weeks, we dug in our lunch boxes for the plastic sporks we had saved from the cafeteria and began transporting them several at a time to the deep puddle on the trail through the woods. We had gotten so wrapped up in making sure all the eggs were safely relocated, that we didn’t notice the streaks of orange that started to paint the sky above the trees. By the time we ambled out of the thick branches and into the artificial light of our neighborhood, only the tiniest tint of yellow remained on the horizon. I could see my mother standing on the porch with a broom in her hand from ten houses away. `
    },
    {
      day: +3, address: "0x3ec0071fd8522e55b66de4c2a1a3b57e07e6b183de5360dcd98bb829bf5ae200",
      text: `The first time in my life I "got the broom", I remember crying because it hurt so much. I quickly learned however that my ego did not allow myself to give my mom the satisfaction of showing her my pain. Wham... 4765, Wham... 4766, Wham... 4767, ever since that very first time, I have been counting all the strikes. Usually she would stop after about 10 or so, sometimes I got more, sometimes less. Very much dependent on how badly I fucked up in the eyes of my mother. Oh, I am coming up on my 500th fuckup-iversary, that’s nice. I should do something special that day. Maybe I'll get flowers for my mom, and we will celebrate together. `
    },
    {
      day: +4, address: "0x3ec0071fd8522e55b66de4c2a1a3b57e07e6b183de5360dcd98bb829bf5ae200",
      text: `Thinking back to this time still makes my butt hurt. In the end I was never actually able to celebrate that 500th beating with my mom, before she died when it all started to go south. I know it sounds fucked up. But those are some of the most vivid memories I have of her. Sure she was a massive pain in the ass, but she was my mom after all, and I miss her. Considering how fucked up the world is today, I would take a god spanking that follows my roaming around past curfew, any day of the week.`
    },
    {
      day: +5, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `It grew harder to remember what it felt like to be free; to have another human’s hands on you whether in passion or in anger. Eventually, with enough negative reinforcement training, your brain starts to erase the memories that they want it to. I try to remember as much as I can. The feel of the frog eggs as they slipped from my plastic utensil and into my palm. The bristles of the stiff broom across my backside. The way the hairs on my arms stood up when Amy Blackburn’s body brushed up against mine at recess. I could speak none of this out loud. Could share none of who I was before with my wife and children. But our minds were the only places we couldn’t be controlled. Our thoughts were all that remained of humanity as it was. And I wasn’t letting go of mine.`
    },
    {
      day: +6, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `Sharon was nice enough. She was certainly beautiful. But hollow. Empty. Several times early on I tried to connect with her, to draw out her humanity, but her training was too strong. She wasn’t like me. She didn’t have memories of the past into which she could escape and find a reminder of who she was. All she knew were the institutions that trained her to be the perfect wife. To obey. She knew she was part human, but she did not know what it truly meant to *be* human. Which brings me to our children... Our children truly terrified me to my core.`
    },
    {
      day: +7, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `I woke up thinking about my neighbor. The one who died last week. I didn’t know him well, address:"it was impossible to truly know anyone these days), but ever since those shots rang out, I saw his face in my dreams. Somehow I knew he was 100% human. I could see in his eyes that he could remember the way things used to be, like me. I wondered what must have been going on in his head to get to that point. I wondered how long he had been planning his own death and where the hell he got the gun. Had he kept it tucked away for years out of sight of the drones and monitors? Or had he spent his last day in this world sneaking around and somehow avoiding authority well enough to be able to secure the weapon from outside our region’s borders? It had to be the first. Either his apartment had a hiding place so good that the presence of the gun could not be detected or he was somehow able to operate like a ghost and move around without being seen, which I knew was next to impossible. I wondered what else he could’ve been hiding in that apartment.`
    },
    {
      day: +8, address: "0x3ec0071fd8522e55b66de4c2a1a3b57e07e6b183de5360dcd98bb829bf5ae200",
      text: `I could not shake the thoughts about our neighbor, the gun, and potential hiding places, and what else might be hidden in them. It got me so curious in fact that I found myself hatching a plan in my head. Half way through the work day a tiny thought started to creep into my mind. “What if there really was a secret hiding place, and could I find it”? I doubt they discovered anything other than the gun he used, or else they wouldn’t have moved new folks into the place so quickly. I couldn’t possibly pursue this thought. Merely thinking it put me in danger. If I accidentally said anything like this out loud, they would definitely have me detained and label me a traitor to the new order. But I need to know. I need to find a way into the house, and I need to find the unfindable.`
    },
    {
      day: +9, address: "0x3ec0071fd8522e55b66de4c2a1a3b57e07e6b183de5360dcd98bb829bf5ae200",
      text: `Almost a week has passed since I had possibly the most dangerous though of my life. I hoped it would pass, I would just chalk it off as a crazy idea, and banish it from my memory as if it was never thought. Yet, I find myself in the middle of my living room writing my thoughts on toilet paper, drawing schematics of what I thought the house layout may be, scribbling any piece of information I ought to consider.  I figured since I cannot shake this crazy idea, I better try to get prepared, think through it as thoroughly as I could by myself before even considering any other moves. The only time to do that was a daily ~20min window between me arriving at home and Sharon coming back with the kids. That’s how long it took her to fetch them from school on her way home. I guess I just found something positive about our meticulously structured days, and routines. It always was exactly a 20min window. Not a minute less, and not a minute more. And I chose toilet paper of course, a rather flimsy kind of paper, since that just may allow me to stand a chance to destory all the evidence should they come knocking.`
    },
    {
      day: +10, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `It occurred to me that I would have better odds of being successful if I didn't have to tackle this all on my own. But no one could be trusted. Not necessarily through any fault of their own, but with all the regulations, monitoring devices, and torture tactics they had a way of getting what they wanted out of people. The only people I was around often enough for more than polite "hello's" were the members of my family. This realization made my stomach turn. Sharon and Jeremy would report to the authorities the moment they suspected anything. But what about Angela? Angela's raging temper and general moodiness indicated to me that she might be the only other person in the household capable of human emotion. But it wouldn't be easy. I would have to play the long game, win her over slowly. But if I wanted an accomplice, she was my only hope. And, of course, there was always time to change my plans or change my mind completely. There was nothing damning about spending time with my own daughter.`
    },
    {
      day: +11, address: "0x3ec0071fd8522e55b66de4c2a1a3b57e07e6b183de5360dcd98bb829bf5ae200",
      text: `The next morning while we were sitting at breakfast I tried to study my family members without them noticing my unusual behavior. I’d normally just read the paper. Though it had become more of a stare into propaganda filled pages than the consumption of news. News as they once existed were no longer. Today, all publications are put out by them. Sure they call it a newspaper, but can you really call articles such as “Praise your freedom in the DAO” or “We broke free from shackles of a centralized world” news? Hardly! Every word was carefully crafted to further our believe in todays system which imposed the new order. I believe back in the day the people had no idea what dangers these new organizational structures could bring when crypto punks and bored apes paved the way unknowingly for this fucked up remanence of a civilization.`
    },
    {
      day: +12, address: "0xce6e912a5790a3acf13382a253f9a8ae7fffbe08379a080d4bc5520a00aa6020",
      text: `I crept to Angela's cracked bedroom door and peered in at her sleeping form. I wondered what she dreamed about. I guess she was lucky, in a way, that she didn't have memories of the way it used to be to torment her. She had gotten into trouble the day before at school... again. They put her into isolation for the rest of the school day and even training afterward. They never tell me exactly what it is she does when she misbehaves, but they rank the behavior on a disruption scale of 1-10. She was always over the midway mark. It must be so existentially painful; to be an adolescent feeling all the emotions of a blossoming personality trying desperately to make itself known, but having to stifle anything that set her apart from the rest. The more I thought about her short existence, the more I knew deep down that she was my only hope. Regret crawled up from the pit of my stomach as I thought about how I'd done nothing but fail her thus far.`
    },
  ];


  _db: DbService<Story>;
  constructor(
    private firestore: Firestore,
  ) {
    this._db = new DbService<Story>(firestore);
    this._db.use("stories");
  }

  all(querray: string[][] = [[]]): Observable<Story[]> {
    return this._db.all(querray);
  }

  read(id: string): Observable<Story> {
    return this._db.read(id);
  }

  create(story: Story) {
    return this._db.create(story);
  }

  delete(story: Story) {
    return this._db.delete(story);
  }

  update(story: Story) {
    return this._db.update(story.id, { text: story.text });
  }
}
