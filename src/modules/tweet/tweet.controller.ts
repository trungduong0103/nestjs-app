import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateTweetDto } from './dto';
import { Tweet } from './interfaces';
import TweetService from './tweet.service';

@Controller('tweets')
export default class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  getAllTweets(): Tweet[] {
    return this.tweetService.getAllTweets();
  }

  @Get(':id')
  getTweetById(@Param('id') id: string): Tweet {
    return this.tweetService.getTweetById(+id);
  }

  @Post('create_tweet')
  createTweet(@Body() tweet: Tweet): Tweet[] {
    return this.tweetService.createTweet(tweet);
  }

  @Delete(':id')
  deleteTweet(@Param('id') id: string): string {
    this.tweetService.deleteTweet(+id);
    return 'Tweet deleted';
  }

  @Put(':id')
  updateTweet(@Body() tweet: UpdateTweetDto): Tweet {
    return this.tweetService.updateTweet(tweet);
  }
}
