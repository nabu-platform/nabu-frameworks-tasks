create sequence seq_tasks;

create table task_schedules (
	id varchar2(36) primary key,
	created timestamp not null,
	modified timestamp not null,
	target varchar2(4000) not null,
	schedule varchar2(4000),
	until timestamp,
	amount integer,
	allow_overlap number(1, 0) not null,
	task varchar2(4000) not null,
	task_type varchar2(4000) not null,
	task_input varchar2(4000),
	enabled number(1, 0) not null,
	manual number(1, 0) not null
);
create table task_schedule_properties (
	id varchar2(36) primary key,
	created timestamp not null,
	modified timestamp not null,
	key varchar2(4000) not null,
	value varchar2(4000) not null,
	task_schedule_id varchar2(36) not null,
	foreign key (task_schedule_id) references task_schedules(id)
);
create table task_queues (
	id varchar2(36) primary key,
	created timestamp not null,
	modified timestamp not null,
	concurrency integer not null,
	"state" varchar2(4000) not null,
	dependency_id varchar2(36),
	schedule varchar2(4000),
	target varchar2(4000) not null,
	name varchar2(4000) not null,
	executor varchar2(4000),
	published timestamp,
	allow_overlap number(1, 0),
	anonymous number(1, 0) not null,
	foreign key (dependency_id) references task_queues(id),
	constraint task_name_unique unique (name)
);
create table tasks (
	id varchar2(36) primary key,
	created timestamp not null,
	modified timestamp not null,
	creator varchar2(4000) not null,
	target varchar2(4000) not null,
	owner varchar2(4000),
	"state" varchar2(4000) not null,
	dependency_id varchar2(36),
	task_index number generated by default AS IDENTITY (START WITH 1) not null,
	task varchar2(4000) not null,
	task_type varchar2(4000) not null,
	task_input varchar2(4000),
	scheduled timestamp,
	stopped timestamp,
	started timestamp,
	task_output varchar2(4000),
	parent_id varchar2(36),
	correlation_id varchar2(4000), 
	group_id varchar2(4000),
	context_id varchar2(4000),
	service_context varchar2(4000),
	alias varchar2(4000),
	realm varchar2(4000),
	task_queue_id varchar2(36) not null,
	task_schedule_id varchar2(36),
	foreign key (dependency_id) references tasks(id),
	foreign key (parent_id) references tasks(id),
	foreign key (task_queue_id) references task_queues(id),
	foreign key (task_schedule_id) references task_schedules(id)
); 
create table task_queue_schedules (
	id varchar2(36) primary key,
	created timestamp not null,
	modified timestamp not null,
	task_schedule_id varchar2(36) not null,
	task_queue_id varchar2(36) not null,
	foreign key (task_schedule_id) references task_schedules(id),
	foreign key (task_queue_id) references task_queues(id)
);
create table task_logs (
	id varchar2(36) primary key,
	created timestamp not null,
	modified timestamp not null,
	severity varchar2(4000) not null,
	actor varchar2(4000) not null,
	title varchar2(4000) not null,
	description clob,
	code varchar2(4000),
	task_id varchar2(36) not null,
	foreign key (task_id) references tasks(id)
);
create table task_properties (
	id varchar2(36) primary key,
	created timestamp not null,
	modified timestamp not null,
	key varchar2(4000) not null,
	value varchar2(4000) not null,
	task_id varchar2(36) not null,
	foreign key (task_id) references tasks(id)
);