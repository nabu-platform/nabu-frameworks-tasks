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
	name text not null
);
create table scheduled_tasks (
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
	task_uri text,
	enabled boolean not null,
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
	taskIndex integer not null default nextval('seq_tasks'),
	task text not null,
	task_type text not null,
	task_uri text,
	scheduled timestamp not null,
	stopped timestamp,
	started timestamp,
	task_queue_id uuid references task_queues(id) not null,
	scheduled_task_id uuid references scheduled_tasks(id)
);
create table task_logs (
	id uuid primary key,
	created timestamp not null,
	modified timestamp not null,
	severity text not null,
	actor text not null,
	title text not null,
	description text,
	task_id uuid references tasks(id) not null
);
