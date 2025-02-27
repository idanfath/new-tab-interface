interface Editor {
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  seconds: number;
  text: string;
  total_seconds: number;
}

interface statsResponse {
  username: string;
  user_id: string;
  start: string;
  end: string;
  status: string;
  total_seconds: number;
  daily_average: number;
  days_including_holidays: number;
  range: string;
  human_readable_range: string;
  human_readable_total: string;
  human_readable_daily_average: string;
  is_coding_activity_visible: boolean;
  is_other_usage_visible: boolean;
  editors: Editor[];
  languages: Editor[];
  machines: Editor[];
  projects: Editor[];
  operating_systems: Editor[];
  categories: Editor[];
}

export interface userData {
  id: string;
  display_name: string;
  full_name: string;
  email: string;
  is_email_public: boolean;
  is_email_confirmed: boolean;
  timezone: string;
  last_heartbeat_at: string;
  last_project: string;
  last_plugin_name: string;
  username: string;
  website: string;
  created_at: string;
  modified_at: string;
  photo: string;
  stats_l7d: statsResponse;
  stats: statsResponse;
}
