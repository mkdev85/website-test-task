// src/seeders/WebsiteSeeder.ts

import { AppDataSource } from "../data-source"; // Adjust path as necessary
import { Website, WebsiteStatus } from "../models/Website";

export class WebsiteSeeder {
  async run() {
    const websiteRepository = AppDataSource.getRepository(Website);

    const websites = [
      { name: "Google", url: "https://www.google.com", status: WebsiteStatus.ONLINE },
      { name: "Facebook", url: "https://www.facebook.com", status: WebsiteStatus.ONLINE },
      { name: "Twitter", url: "https://www.twitter.com", status: WebsiteStatus.OFFLINE },
      { name: "GitHub", url: "https://www.github.com", status: WebsiteStatus.ONLINE },
      { name: "LinkedIn", url: "https://www.linkedin.com", status: WebsiteStatus.ONLINE },
      { name: "Reddit", url: "https://www.reddit.com", status: WebsiteStatus.OFFLINE },
      { name: "Netflix", url: "https://www.netflix.com", status: WebsiteStatus.ONLINE },
      { name: "Spotify", url: "https://www.spotify.com", status: WebsiteStatus.ONLINE },
      { name: "Amazon", url: "https://www.amazon.com", status: WebsiteStatus.ONLINE },
      { name: "Apple", url: "https://www.apple.com", status: WebsiteStatus.ONLINE },
      { name: "Microsoft", url: "https://www.microsoft.com", status: WebsiteStatus.ONLINE },
      { name: "Wikipedia", url: "https://www.wikipedia.org", status: WebsiteStatus.ONLINE },
      { name: "YouTube", url: "https://www.youtube.com", status: WebsiteStatus.ONLINE },
      { name: "Instagram", url: "https://www.instagram.com", status: WebsiteStatus.ONLINE },
      { name: "Pinterest", url: "https://www.pinterest.com", status: WebsiteStatus.OFFLINE },
      { name: "Dropbox", url: "https://www.dropbox.com", status: WebsiteStatus.ONLINE },
      { name: "Slack", url: "https://www.slack.com", status: WebsiteStatus.ONLINE },
      { name: "Zoom", url: "https://www.zoom.us", status: WebsiteStatus.ONLINE },
      { name: "Twitch", url: "https://www.twitch.tv", status: WebsiteStatus.ONLINE },
      { name: "Airbnb", url: "https://www.airbnb.com", status: WebsiteStatus.ONLINE },
    ];

    try {
      // Clear existing data (optional)
      await websiteRepository.clear();

      // Save new data
      await websiteRepository.save(websites);
      console.log("20 websites have been added to the database.");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  }
}
