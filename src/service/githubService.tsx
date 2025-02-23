export const GitHubService = {
  async getContributions() {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${
        import.meta.env.VITE_GITHUB_USERNAME
      }?y=last`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub contributions");
    }

    return response.json();
  },
};
