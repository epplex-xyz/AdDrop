<h1 align="center">AdDrop</h1>

A mobile app for creators to airdrop NFTs as ads, and for consumers to view, earn & use ads

Ad types as epNFTs include:
- Survey
- 3-second video
- Limited-time coupon
- Limited-time access token

No wallet cluttering with ads, since epNFTs self-destruct after a set time.

## Website
[addrop.cc](https://addrop.cc)

## Pitch
[Link to pitch](https://addrop.cc/pitch.pdf) (incomplete)
[Link to UI Designs](https://addrop.cc/UIDesign.pdf) (incomplete)


## Roadblack
This idea has been put on pause for now, since the following needs to be thought out

- Who is going to use a platform with ads only
- Brands want users with money, this platform attracts "eager earners"


## Background
I finished building the epPlex<insert link> MVP, then I was looking for some use-cases and AdDrop came to mind with ephemeral NFTs as ads.

So for AdDrop I had to showcase epPlex, although I'm not strictly married to epNFTs for this idea.

## MVP
This is what would constitute a MVP
- Ad creator can create a campaign
- AdDrop distributes epNFT
- User sees epNFT in wallet
- User goes to platform to engage with ad/epNFT to get rewards


### Working features
- User signup
- Brand signup
- Brand can create ad campaign by going through creation procedure
  - Can use BONK, SOL, USDC, EUROe as payment for creation
  - These funds are held in escrow until campaign launch

## Tech stack
- NFTs: epPlex
- NestJS Backend (hosted on railway.app)
- NextJS Frontend (hosted on vercel)
  - Material UI
- Prisma
- Postgres DB (Supabase)

Credits
- [dReader](https://github.com/d-reader-organization) for providing NestJs inspiration
- [Cubik](https://github.com/cubik-so) for providing monorepo inspiration