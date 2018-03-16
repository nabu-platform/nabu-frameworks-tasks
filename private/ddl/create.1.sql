create sequence seq_tasks;

create table task_queues (
	id uuid primary key,
	created timestamp not null,
	modified timestamp not null,
	concurrency integer not null,
	state text not null,
	dependency_id uuid references task_queues(id),
	schedule text,
	target text not null,
	name text not null unique,
	executor text,
	published timestamp,
	allow_overlap boolean
);
create table task_schedules (
	id uuid primary key,
	created timestamp not null,
	modified timestamp not null,
	target text not null,
	schedule text,
	until timestamp,
	amount integer,
	allow_overlap boolean not null,
	task text not null,
	task_type text not null,
	task_input text,
	enabled boolean not null,
	manual boolean not null default false
);
create table task_queue_schedules (
	id uuid primary key,
	created timestamp not null,
	modified timestamp not null,
	task_schedule_id uuid references task_schedules(id) not null,
	task_queue_id uuid references task_queues(id) not null
);
create table tasks (
	id uuid primary key,
	created timestamp not null,
	modified timestamp not null,
	creator text not null,
	target text not null,
	owner text,
	state text not null,
	dependency_id uuid references tasks(id),
	task_index bigint not null default nextval('seq_tasks'),
	task text not null,
	task_type text not null,
	task_input text,
	task_output text,
	scheduled timestamp default now(), 
	stopped timestamp,
	started timestamp,
	parent_id uuid references tasks(id),
	correlation_id text,
	group_id text,
	context_id text,
	task_queue_id uuid references task_queues(id) not null,
	task_schedule_id uuid references task_schedules(id)
);
create table task_logs (
	id uuid primary key,
	created timestamp not null,
	modified timestamp not null,
	severity text not null,
	actor text not null,
	title text not null,
	description text,
	code text,
	task_id uuid references tasks(id) not null
);
create table task_properties (
	id uuid primary key,
	created timestamp not null,
	modified timestamp not null,
	key text not null,
	value text not null,
	task_id uuid references tasks(id) not null
);
create table task_schedule_properties (
	id uuid primary key,
	created timestamp not null,
	modified timestamp not null,
	key text not null,
	value text not null,
	task_schedule_id uuid references task_schedules(id) not null
);