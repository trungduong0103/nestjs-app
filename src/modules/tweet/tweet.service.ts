import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTweetDto, UpdateTweetDto } from './dto';
import { Tweet } from './interfaces';

@Injectable()
export default class TweetService {
  private tweets: Tweet[] = [];

  getTweetIndex(id: number) {
    return this.tweets.findIndex((tweet) => tweet.id === id);
  }

  getAllTweets() {
    return this.tweets;
  }

  getTweetById(id: number): Tweet | undefined {
    const tweetIndex = this.getTweetIndex(id);
    if (tweetIndex === -1) {
      throw new HttpException(
        `Tweet with ID ${id} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.tweets[tweetIndex];
  }

  createTweet(tweet: CreateTweetDto): Tweet[] {
    const newTweet: Tweet = {
      id: Date.now(),
      ...tweet,
    };

    this.tweets.push(newTweet);
    return this.tweets;
  }

  updateTweet(tweet: UpdateTweetDto): Tweet | undefined {
    let updateTweet = this.getTweetById(tweet.id);

    updateTweet = tweet;
    return updateTweet;
  }

  deleteTweet(id: number): undefined {
    const tweetIndex = this.getTweetIndex(id);
    if (tweetIndex === -1) {
      throw new HttpException(
        `Tweet with ID ${id} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.tweets.splice(tweetIndex, 1);
    return;
  }
}
