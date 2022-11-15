# Tarot Journal
I think of tarot as in interesting window into the subconscious - as a sort of conversation with yourself to get a clearer idea of what you really think beneath your conscious thoughts and unconscious biases. Since there's nobody who knows you better than you know you, oftentimes you're able to give yourself some really good advice - you just need a way and the will to listen, and for me, tarot can sometimes be the way.

When doing readings for myself, I often only did them in the moment, then promptly forgot what I did immediately after, which kind of defeated the purpose. So I looked for a way to create a journal of my readings - a way to remember the readings themselves, yes, but also a way to keep track of the internal shifts in how I viewed both the world around me and the situations I found myself in within it. And who knows, maybe someone else will find use in it for themselves too.

https://user-images.githubusercontent.com/93284023/201819466-90310c19-1255-4009-a5e9-dfb066ec9b03.mp4

## Link to project: 
https://tarot-journal.up.railway.app/

## How It's Made:

## Tech / Libraries used: 
- HTML
- CSS
- Tailwind
- JavaScript 
- Node.js 
- MongoDB 
- Mongoose 
- EJS


## Future Features
- add more spreads
- improve UI/UX
- make a mobile version

## Lessons Learned:
I used this project as a way to learn Tailwind, as well as a way to solidify my handle on EJS and Mongoose. I think this project succeeded in both these things.

There were quite a few moments while coding out the interactions that took much longer than I expected to figure out. Figuring out how to make the interpretation window draggable was one. 

Another was, when I was first creating the interpretation window, adding a card to an interpretation slot was easy enough (just drag it onto the corresponding card slot), but removing it wouldn't remove it from the slot - instead, the slot in the interpretation window would read as the last element placed in the corresponding card slot. 

So for example, if my initial setup had Past - The World : Present - The Empress : Future - Strength, and then if I had dragged a Fool into the card reading slot for Present cards, you would see The Fool show up in the interpretation window for the Present card, such that in the interpretation window, you would see "Past - The World : Present - The Fool : Future - Strength. However, if you removed the Fool from the Present slot, the interpretation window wouldn't update accordingly. Or worse, if you then dragged the Fool into, say, the Past slot, the interpretation window would think there were two Fools in the reading (Past - The Fool : Present - The Fool : Future Strength). It was only when I realized this was the perfect use of a queue that I figured out how to solve the issue (ie. removing the Fool from the Present slot would either clear the slot or set the element underneath it as the correct value, such that Past - The World : Present - The Empress : Future - Strength, then if you then removed the World from the Past slot, you would have Past [blank] : Present - The Empress : Future - Strength). This has helped to change how I think of arrays such that if I ever encounter another need for a queue, I'll know exactly what to do.  
---

## Packages/Dependencies used 

bcrypt, cloudinary, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

## Install all the dependencies or node packages used for development via Terminal

`pnpm install` 

---

## Start server

`pnpm start`


## Things to add
