// src/seeders/WebsiteSeeder.ts

import { AppDataSource } from "../data-source"; // Adjust path as necessary
import { Website, WebsiteStatus } from "../models/Website";

export class WebsiteSeeder {
  async run() {
    const websiteRepository = AppDataSource.getRepository(Website);

    // Data to seed
    const websites = [
      {
        name: "Google",
        url: "https://www.google.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Twitter",
        url: "https://www.twitter.com",
        status: WebsiteStatus.OFFLINE,
      },
      {
        name: "GitHub",
        url: "https://www.github.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Reddit",
        url: "https://www.reddit.com",
        status: WebsiteStatus.OFFLINE,
      },
      {
        name: "Netflix",
        url: "https://www.netflix.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Spotify",
        url: "https://www.spotify.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Apple",
        url: "https://www.apple.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Microsoft",
        url: "https://www.microsoft.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wikipedia",
        url: "https://www.wikipedia.org",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pinterest",
        url: "https://www.pinterest.com",
        status: WebsiteStatus.OFFLINE,
      },
      {
        name: "Dropbox",
        url: "https://www.dropbox.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Slack",
        url: "https://www.slack.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Zoom",
        url: "https://www.zoom.us",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Twitch",
        url: "https://www.twitch.tv",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Airbnb",
        url: "https://www.airbnb.com",
        status: WebsiteStatus.ONLINE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    try {
      // Check if any websites are already seeded
      const existingWebsitesCount = await websiteRepository.count();

      if (existingWebsitesCount > 0) {
        console.log(
          "Websites data already exists in the database. No seeding necessary."
        );
        return;
      }

      // Seed data if no records are found
      await websiteRepository.save(websites);
      console.log("20 websites have been added to the database.");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  }
}
