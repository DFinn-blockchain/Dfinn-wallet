export type MissionCategory = {
  name: string;
  slug: string;
};

export type MissionInfo = {
  id: number;
  name: string | null;
  status: string | null;
  ordinal: number | null;
  description: string | null;
  start_time: string | null;
  end_time: string | null;
  url: string;
  twitter_url: string;
  reward: string | null;
  total_winner: string | null;
  total_supply: string | null;
  tags: string[] | null;
  logo: string;
  backdrop_image: string;
  campaign_url: string | null;
  chains: string[] | null;
};
