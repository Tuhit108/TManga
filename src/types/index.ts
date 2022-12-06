

export interface DetailScreenProps {
  id: string;
}
export interface GenresProps {
  id: string;
  name : string;
}
export interface ChapterProps {
  id: string;
  name : string
}

export interface RawUser{
  id: string;
  name: string;
  access_token?: string;
  client_key: string;
  client_secret: string;
  avatar?: string;
}
export interface RawMember {
  id:               string;
  uid:              string;
  hid:              string;
  token:            string;
  metatype:         string;
  first_name:       string;
  last_name:        string;
  name:             string;
  email:            string;
  username:         string;
  manager:          string[];
  title:            string;
  phone:            string;
  address:          string;
  image:            string;
  gavatar:          string;
  color:            string;
  role:             string;
  status:           string;
  since:            string;
  networks:         string[];
  system_id:        string;
  sas:              any[];
  lang:             string;
  accesses:         any[];
  timesheet:        Array<Array<number[]>>;
  dob:              Dob;
  disabled_message: number;
  timezone:         number;
  keywords:         string;
}

export interface Dob {
  day:   number;
  month: number;
  year:  number;
}


export interface Data {
  subtasks: number;
  comments: number;
  review_time: number;
  reviewers: string[];
  deadline_user: number;
  tasklist_reviewers: any[];
}

export interface Result {
  content: string;
  files: any[];
}
export interface Item {
  id: string;
  name: string;
  status: number;
  since: number;
  last_update: number;
  user_id: string;
  username: string;
  note: string;
  files: any[];
  assign: string;}

export interface Checklist {
  id: string;
  name: string;
  username: string;
  items: Item[];
}
export interface Form {
  id: string;
  value: any;
  display: string;
  type: string;
  name: string;
  placeholder: string;
  options: any[];
}

export interface CachedSubtask {
  id: string;
  name: string;
  user_id: string;
  creator_id: string;
  status: number;
  review: string;
  deadline: string;
}

export interface Stats {
  comments: number;
  likes: number;
}

export interface Ns {
  id: string;
  name: string;
  type: string;
  hid: string;
  link: string;
  path: string;
}

export interface Acl {
  managed: number;
  role: string;
  view: number;
  review: number;
  review_subtask: number;
  name: number;
  status: number;
  desc: number;
  time: number;
  result: number;
  checklist: number;
  remove: number;
  delegate: number;
  unassign: number;
  review_enabled: number;
  review_subtask_enabled: number;
  checked_tasklist_review: number;
  assign: number;
}

export interface Compute {
  checklists?: any;
  files: string;
}

export interface OriginExport {
}
export interface RawTask {
  id: string;
  gid: number;
  hid: string;
  type: string;
  token: string;
  parent_id: number;
  name: string;
  display_name: string;
  content: string;
  content_short: string;
  link: string;
  user_id: string;
  username: string;
  metatype: string;
  avatar?: string;
  cover: string;
  creator_id: string;
  creator_username: string;
  has_deadline: string;
  deadline: string;
  deadline_has_time: number;
  start_time: string;
  stime: number;
  etime: number;
  overdue: number;
  urgent: string;
  important: string;
  started: number;
  completed_time: number;
  starred: string;
  complete: string;
  keywords: string;
  data: Data;
  score: number;
  tags: any[];
  files: any[];
  status: string;
  review: string;
  result: Result;
  owners: any[];
  followers: Follower[];
  form: Form[];
  since: string;
  last_update: string;
  checklists: Checklist[];
  tasklist_id: string;
  project_id: string;
  milestone_id: string;
  cached_subtasks: CachedSubtask[];
  stats: Stats;
  real_order: string;
  ns: Ns;
  acl: Acl;
  __compute: Compute;
  origin_export: OriginExport;
  duration: string;
  logged_duration: string;
}


export interface RawComment {
  id:string;
  user_id: string;
  content:string;
  reactions:[];
  time:string
}

export interface RawProject{
  id:                 string;
  hid:                string;
  path:               string;
  metatype:           string;
  privacy:            string;
  token:              string;
  name:               string;
  content:            string;
  category:           null;
  form:               any[];
  tags:               Tag[];
  color:              string;
  owners:             Follower[];
  followers:          Follower[];
  stime:              string;
  etime:              string;
  since:              string;
  last_update:        string;
  status:             string;
  status_obj:         StatusObj;
  stage:              string;
  is_demo:            boolean;
  managed:            number;
  data:               Data;
  bg:                 Bg;
  stats:              ProjectStats;
  base:               Base;
  acl:                ACL;
  review_enabled:     number;
  external:           string;
  keywords:           string;
  cached_tasklists:   TaskList[];
  template:           string;
  options:            Options;
  opt_acl:            OptACL[];
  opt_task_acl:       OptACL[];
  review:             Review;
  task_duration:      number;
  percent_completion: number;
  deadline_has_time:  string;
  dept_id:            string;
  incoming_webhook:   string;
  webhooks:           Webhooks;
  icon:               null;
}

export interface ACL {
  managed:         number;
  task_create:     number;
  tasklist_create: number;
  active:          number;
  full_view:       number;
}

export interface Base {
  id: null;
}

export interface Bg {
  type:   string;
  blurry: number;
}

export interface TaskList {
  id:   number | string;
  name: string;
}

export interface Data {
  tasklists:                      TaskList[];
  total:                          number;
  complete:                       number;
  active:                         number;
  overdue:                        number;
  v31sysfix:                      number;
  __swework:                      Options;
  percent_completion:             string;
  task_duration:                  string;
  block_result_update_after_done: string;
  deadline_has_time:              string;
  task_cannot_remove:             string;
  remove_assign:                  string;
  topics:                         number;
  stats_changed:                  number;
}

export interface Options {
  style:              string;
  view:               string;
  file_upload:        string;
  project_edit:       string;
  project_delete:     string;
  block_task_edit:    string;
  block_task_time:    string;
  block_task_remove:  string;
  task_assign:        string;
  task_overdue:       string;
  task_edit:          string;
  task_delete:        string;
  task_status_update: string;
  reminder_daily:     string;
  team_stack:         string;
  team_base:          string;
  remove_project:     string;
}

export interface Follower {
  username: string;
  gavatar:  string;
}

export interface OptACL {
  label:    string;
  sublabel: string;
  key:      string;
  privs:    Priv[];
}

export interface Priv {
  key:   Key;
  value: number;
}

export enum Key {
  Follower = "follower",
  Guest = "guest",
  Other = "other",
  Owner = "owner",
}

export interface Review {
  enabled:            number;
  review_subtask:     number;
  sla_review_task:    number;
  sla_review_subtask: number;
  users:              any[];
  assigner:           number;
}

export interface ProjectStats {
  total:    number;
  complete: number;
  active:   number;
  overdue:  number;
}

export interface StatusObj {
  stage:  string;
  status: string;
  color:  string;
  note:   null;
}

export interface Tag {
  name:  string;
  color: string;
  key:   string;
}

export interface Webhooks {
}

