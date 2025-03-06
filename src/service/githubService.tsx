import { fetchLocalData } from "@/lib/utils";

export const GitHubService = {
  async getContributions() {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${fetchLocalData(
        "github_username",
        "idanfath"
      )}?y=last`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub contributions");
    }

    return response.json();
  },
};
