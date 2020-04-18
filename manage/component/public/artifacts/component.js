window.addEventListener("load", function() {
	if (nabu && nabu.page && nabu.page.provide) {
		nabu.page.provide("page-structure", { 
			name: "Tasks Overview",
			description: "An overview of all the tasks in the system",
			icon: "images/icons/tasks.svg",
			content: { 
				rows: [
					{
						"id": 1,
						"cells": [
							{
								"id": 2,
								"rows": [],
								"alias": "data-table-list",
								"bindings": {
									"orderBy": null,
									"limit": null,
									"offset": null,
									"id": null,
									"creator": null,
									"target": null,
									"owner": null,
									"state": null,
									"dependencyId": null,
									"taskIndex": null,
									"task": null,
									"taskType": null,
									"taskInput": null,
									"scheduled": null,
									"stopped": null,
									"started": null,
									"taskOutput": null,
									"parentId": null,
									"correlationId": "page.correlationId",
									"groupId": null,
									"contextId": null,
									"serviceContext": null,
									"alias": null,
									"realm": null,
									"taskQueueId": "page.queueId",
									"taskScheduleId": "page.scheduleId",
									"properties": null
								},
								"name": null,
								"state": {
									"autoRefresh": null,
									"orderBy": [
										"taskIndex desc"
									],
									"filterPlaceHolder": null,
									"filterType": {
										"component": "data-combo-filter",
										"name": "Combo Filter",
										"configure": "data-combo-filter-configure"
									},
									"title": "Tasks",
									"limit": 10,
									"actions": [
										{
											"name": "selectTask",
											"icon": null,
											"class": null,
											"label": null,
											"condition": null,
											"refresh": false,
											"global": false,
											"close": false,
											"type": "button",
											"useSelection": false
										},
										{
											"name": "cancelTask",
											"icon": "fa-times",
											"class": "danger-text",
											"label": null,
											"condition": "state.record.state == \"CREATED\"",
											"refresh": true,
											"global": false,
											"close": false,
											"type": "button",
											"useSelection": false
										},
										{
											"name": "failTask",
											"icon": "fa-ban",
											"class": "danger-text",
											"label": null,
											"condition": "state.record.state == \"ERROR\"",
											"refresh": true,
											"global": false,
											"close": false,
											"type": "button",
											"useSelection": false
										},
										{
											"name": "retryTask",
											"icon": "fa-sync",
											"class": null,
											"label": null,
											"condition": "",
											"refresh": true,
											"global": false,
											"close": false,
											"type": "button",
											"useSelection": false
										},
										{
											"name": "wakeup",
											"icon": null,
											"class": null,
											"label": "Wakeup",
											"condition": null,
											"refresh": false,
											"global": true,
											"close": false,
											"type": "button",
											"useSelection": false
										},
										{
											"name": "showTaskInput",
											"icon": "fa-info-circle",
											"class": "warning-text",
											"label": null,
											"condition": "state.record.taskInput != null",
											"refresh": false,
											"global": false,
											"close": false,
											"type": "button",
											"useSelection": false
										}
									],
									"filters": [
										{
											"name": "correlationId",
											"label": "Correlation Id",
											"description": null,
											"type": "text",
											"enumerations": [],
											"value": null,
											"group": null,
											"joinGroup": false,
											"textType": null
										},
										{
											"name": "task",
											"label": "Task",
											"description": null,
											"type": "text",
											"enumerations": [],
											"value": null,
											"group": null,
											"joinGroup": false,
											"textType": null
										},
										{
											"name": "state",
											"label": "State",
											"description": null,
											"type": "enumeration",
											"enumerations": [
												"CREATED",
												"WAITING",
												"RUNNING",
												"SUCCEEDED",
												"ERROR",
												"TRANSIENT_ERROR",
												"FAILED",
												"CANCELLED"
											],
											"value": null,
											"group": null,
											"joinGroup": false
										},
										{
											"name": "groupId",
											"label": "Group Id",
											"description": null,
											"type": "text",
											"enumerations": [],
											"value": null,
											"group": null,
											"joinGroup": false,
											"textType": null
										},
										{
											"name": "contextId",
											"label": "Context Id",
											"description": null,
											"type": "text",
											"enumerations": [],
											"value": null,
											"group": null,
											"joinGroup": false,
											"textType": null
										}
									],
									"fields": [
										{
											"label": "Index",
											"fragments": [
												{
													"type": "data",
													"key": "taskIndex",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [],
											"hidden": null,
											"width": "0.5"
										},
										{
											"label": "Task",
											"fragments": [
												{
													"type": "data",
													"key": "task",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [],
											"hidden": null,
											"width": "2"
										},
										{
											"label": "state",
											"fragments": [
												{
													"type": "data",
													"key": "state",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [
												{
													"class": "success",
													"condition": "state.record.state == \"SUCCEEDED\""
												},
												{
													"class": "danger",
													"condition": "state.record.state == \"ERROR\" || state.record.state == \"TRANSIENT_ERROR\""
												},
												{
													"class": "warning",
													"condition": "state.record.state == \"FAILED\""
												}
											],
											"hidden": null,
											"width": "0.5"
										},
										{
											"label": "correlation",
											"fragments": [
												{
													"type": "data",
													"key": "correlationId",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [],
											"hidden": null,
											"width": "2"
										},
										{
											"label": "context",
											"fragments": [
												{
													"type": "data",
													"key": "contextId",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [],
											"hidden": null,
											"width": ""
										},
										{
											"label": "group",
											"fragments": [
												{
													"type": "data",
													"key": "groupId",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [],
											"hidden": null,
											"width": ""
										},
										{
											"label": "run",
											"fragments": [
												{
													"type": "data",
													"key": "started",
													"content": null,
													"format": "date",
													"javascript": null,
													"template": null,
													"class": null,
													"form": {},
													"dateFormat": "MMM dd: HH:mm:ss",
													"tag": "span",
													"html": null,
													"amountOfDecimals": null
												},
												{
													"type": "text",
													"content": " - ",
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"key": null,
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": "span",
													"html": null,
													"amountOfDecimals": null,
													"multiline": false
												},
												{
													"type": "data",
													"content": null,
													"format": "date",
													"javascript": null,
													"template": null,
													"class": null,
													"key": "stopped",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": "HH:mm:ss",
													"tag": "span",
													"html": null,
													"amountOfDecimals": null
												}
											],
											"styles": [],
											"hidden": null,
											"width": "1.5"
										}
									],
									"updateOperation": null,
									"updateBindings": {},
									"multiselect": false,
									"styles": [],
									"refreshOn": [],
									"showRefresh": true,
									"result": {
										"alias": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"contextId": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"correlationId": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"creator": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"dependencyId": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"groupId": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"id": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"owner": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"parentId": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"realm": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"scheduled": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"serviceContext": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"started": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"state": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"stopped": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"target": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"task": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"taskIndex": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"taskInput": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"taskOutput": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"taskQueueId": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"taskScheduleId": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"taskType": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"created": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										}
									},
									"operation": "nabu.frameworks.tasks.manage.rest.task.list",
									"comboFilter": {
										"useTags": true
									}
								},
								"target": "page",
								"on": null,
								"class": null,
								"customId": null,
								"width": 1,
								"height": null,
								"instances": {},
								"condition": null,
								"devices": [],
								"clickEvent": null,
								"result": {}
							},
							{
								"id": 4,
								"rows": [
									{
										"id": 7,
										"cells": [
											{
												"id": 8,
												"rows": [],
												"alias": "page-actions",
												"bindings": {},
												"name": null,
												"state": {
													"class": "buttons",
													"actions": [
														{
															"label": "Queue",
															"route": "tasks-queues",
															"event": null,
															"eventState": null,
															"eventFixedState": null,
															"hasFixedState": false,
															"anchor": null,
															"mask": false,
															"condition": "!!$value(\"selectTask.taskQueueId\") && !$value(\"page.queueId\")",
															"disabled": null,
															"bindings": {
																"queueId": "selectTask.taskQueueId"
															},
															"actions": [],
															"icons": null,
															"activeRoutes": [],
															"class": "right",
															"buttonClass": "primary",
															"icon": ""
														},
														{
															"label": "Schedule",
															"route": "tasks-schedules",
															"event": null,
															"eventState": null,
															"eventFixedState": null,
															"hasFixedState": false,
															"anchor": null,
															"mask": false,
															"condition": "!!$value(\"selectTask.taskScheduleId\") && !$value(\"page.scheduleId\")",
															"disabled": null,
															"bindings": {
																"scheduleId": "selectTask.taskScheduleId"
															},
															"actions": [],
															"icons": null,
															"activeRoutes": [],
															"class": null,
															"buttonClass": null
														}
													],
													"activeClass": null,
													"disabledClass": null,
													"pastClass": null,
													"defaultAction": null,
													"useButtons": true
												},
												"target": "page",
												"on": null,
												"class": null,
												"customId": null,
												"width": 1,
												"height": null,
												"instances": {},
												"condition": null,
												"devices": [],
												"clickEvent": null
											}
										],
										"class": null,
										"customId": null,
										"instances": {},
										"condition": null,
										"direction": null,
										"align": null,
										"on": null,
										"collapsed": false,
										"name": null
									}
								],
								"alias": "page-fields",
								"bindings": {},
								"name": null,
								"state": {
									"class": "row",
									"fields": [
										{
											"label": "Queue",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": "resolve",
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.taskQueueId",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null,
													"resolveOperationBinding": {},
													"resolveOperation": "nabu.frameworks.tasks.manage.rest.taskQueue.list",
													"resolveOperationLabel": "name",
													"resolveOperationId": "id",
													"resolveOperationIds": "id"
												}
											],
											"hidden": null,
											"styles": []
										},
										{
											"label": "Run As",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.alias",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												},
												{
													"type": "text",
													"content": "@",
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"key": null,
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null,
													"multiline": false
												},
												{
													"type": "data",
													"content": null,
													"format": "text",
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.realm",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": "!$value(\"selectTask.alias\")",
											"styles": []
										},
										{
											"label": "Creator",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.creator",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": null,
											"styles": []
										},
										{
											"label": "Owner",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.owner",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": "!$value(\"selectTask.owner\")",
											"styles": []
										},
										{
											"label": "Service Context",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.serviceContext",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": "!$value(\"selectTask.serviceContext\")",
											"styles": []
										},
										{
											"label": "Target",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.target",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": null,
											"styles": []
										},
										{
											"label": "Type",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.taskType",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": null,
											"styles": []
										},
										{
											"label": "Created",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": "date",
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.created",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": "MMM dd - HH:mm:ss",
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": null,
											"styles": []
										},
										{
											"label": "Scheduled",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": "date",
													"javascript": null,
													"template": null,
													"class": null,
													"key": "selectTask.scheduled",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": "MMM dd - HH:mm:ss",
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": "!$value(\"selectTask.scheduled\")",
											"styles": []
										}
									]
								},
								"target": "page",
								"on": "selectTask",
								"class": "align-start",
								"customId": null,
								"width": "0.25",
								"height": null,
								"instances": {},
								"condition": null,
								"devices": [],
								"clickEvent": null
							}
						],
						"class": null,
						"customId": null,
						"instances": {},
						"condition": null,
						"direction": null,
						"align": null,
						"on": null,
						"collapsed": false,
						"name": null
					},
					{
						"id": 3,
						"cells": [
							{
								"id": 10,
								"rows": [],
								"alias": "data-table-list",
								"bindings": {
									"orderBy": null,
									"limit": null,
									"offset": null,
									"id": null,
									"severity": null,
									"actor": null,
									"title": null,
									"description": null,
									"code": null,
									"taskId": "selectTask.id",
									"properties": null
								},
								"name": null,
								"state": {
									"autoRefresh": null,
									"orderBy": [
										"created desc"
									],
									"filterPlaceHolder": null,
									"filterType": {
										"component": "data-combo-filter",
										"name": "Combo Filter"
									},
									"title": "Logs",
									"limit": 10,
									"actions": [
										{
											"name": "viewLog",
											"icon": "fa-search",
											"class": null,
											"label": null,
											"condition": "!!state.record.description",
											"refresh": false,
											"global": false,
											"close": false,
											"type": "button",
											"useSelection": false
										}
									],
									"filters": [],
									"fields": [
										{
											"label": "Date",
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": "date",
													"javascript": null,
													"template": null,
													"class": null,
													"key": "created",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": "MMM dd - HH:mm:ss",
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": null,
											"styles": [],
											"width": "1.5"
										},
										{
											"label": "severity",
											"fragments": [
												{
													"type": "data",
													"key": "severity",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [
												{
													"class": "danger",
													"condition": "state.record.severity == \"ERROR\" || state.record.severity == \"CRITICAL\""
												}
											],
											"hidden": null,
											"width": "0.7"
										},
										{
											"label": "code",
											"fragments": [
												{
													"type": "data",
													"key": "code",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [],
											"hidden": null,
											"width": "1"
										},
										{
											"label": "title",
											"fragments": [
												{
													"type": "data",
													"key": "title",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [],
											"hidden": null,
											"width": "5"
										},
										{
											"label": "actor",
											"fragments": [
												{
													"type": "data",
													"key": "actor",
													"content": null,
													"format": null,
													"javascript": null,
													"template": null,
													"class": null,
													"form": {}
												}
											],
											"styles": [],
											"hidden": null
										}
									],
									"updateOperation": null,
									"updateBindings": {},
									"multiselect": false,
									"styles": [],
									"refreshOn": [],
									"showRefresh": true,
									"result": {
										"actor": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"code": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"description": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"id": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"severity": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"taskId": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"title": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										},
										"created": {
											"label": null,
											"format": null,
											"custom": null,
											"styles": []
										}
									},
									"operation": "nabu.frameworks.tasks.manage.rest.task.log.list"
								},
								"target": "page",
								"on": "selectTask",
								"class": null,
								"customId": null,
								"width": 1,
								"height": null,
								"instances": {},
								"condition": null,
								"devices": [],
								"clickEvent": null,
								"result": {}
							}
						],
						"class": null,
						"customId": null,
						"instances": {},
						"condition": null,
						"direction": null,
						"align": null,
						"on": null,
						"collapsed": false,
						"name": null
					},
					{
						"id": 11,
						"cells": [
							{
								"id": 12,
								"rows": [
									{
										"id": 13,
										"cells": [
											{
												"id": 14,
												"rows": [],
												"alias": "page-actions",
												"bindings": {},
												"name": null,
												"state": {
													"class": "buttons",
													"actions": [
														{
															"label": "Close",
															"route": null,
															"event": "$close",
															"eventState": null,
															"eventFixedState": null,
															"hasFixedState": false,
															"anchor": null,
															"mask": false,
															"condition": null,
															"disabled": null,
															"bindings": {},
															"actions": [],
															"icons": null,
															"activeRoutes": [],
															"class": "right",
															"buttonClass": "primary"
														}
													],
													"activeClass": null,
													"disabledClass": null,
													"pastClass": null,
													"defaultAction": null,
													"useButtons": true
												},
												"target": "page",
												"on": null,
												"class": null,
												"customId": null,
												"width": 1,
												"height": null,
												"instances": {},
												"condition": null,
												"devices": [],
												"clickEvent": null
											}
										],
										"class": null,
										"customId": null,
										"instances": {},
										"condition": null,
										"direction": null,
										"align": null,
										"on": null,
										"collapsed": false,
										"name": null
									}
								],
								"alias": "page-fields",
								"bindings": {},
								"name": null,
								"state": {
									"class": null,
									"fields": [
										{
											"label": null,
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": "text",
													"javascript": null,
													"template": null,
													"class": null,
													"key": "viewLog.description",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": null,
											"styles": []
										}
									]
								},
								"target": "prompt",
								"on": "viewLog",
								"class": "overflow",
								"customId": null,
								"width": 1,
								"height": null,
								"instances": {},
								"condition": null,
								"devices": [],
								"clickEvent": null
							}
						],
						"class": null,
						"customId": null,
						"instances": {},
						"condition": null,
						"direction": null,
						"align": null,
						"on": null,
						"collapsed": false,
						"name": "view-log"
					},
					{
						"id": 16,
						"cells": [
							{
								"id": 17,
								"rows": [
									{
										"id": 18,
										"cells": [
											{
												"id": 19,
												"rows": [],
												"alias": "page-actions",
												"bindings": {},
												"name": null,
												"state": {
													"class": "buttons",
													"actions": [
														{
															"label": "Close",
															"route": null,
															"event": "$close",
															"eventState": null,
															"eventFixedState": null,
															"hasFixedState": false,
															"anchor": null,
															"mask": false,
															"condition": null,
															"disabled": null,
															"bindings": {},
															"actions": [],
															"icons": null,
															"activeRoutes": [],
															"class": "right",
															"buttonClass": "primary"
														}
													],
													"activeClass": null,
													"disabledClass": null,
													"pastClass": null,
													"defaultAction": null,
													"useButtons": true
												},
												"target": "page",
												"on": null,
												"class": null,
												"customId": null,
												"width": 1,
												"height": null,
												"instances": {},
												"condition": null,
												"devices": [],
												"clickEvent": null
											}
										],
										"class": null,
										"customId": null,
										"instances": {},
										"condition": null,
										"direction": null,
										"align": null,
										"on": null,
										"collapsed": false,
										"name": null
									}
								],
								"alias": "page-fields",
								"bindings": {},
								"name": null,
								"state": {
									"class": null,
									"fields": [
										{
											"label": null,
											"fragments": [
												{
													"type": "data",
													"content": null,
													"format": "highlight",
													"javascript": null,
													"template": null,
													"class": null,
													"key": "showTaskInput.taskInput",
													"disabled": null,
													"hidden": null,
													"form": {},
													"dateFormat": null,
													"tag": null,
													"html": null,
													"amountOfDecimals": null
												}
											],
											"hidden": null,
											"styles": []
										}
									]
								},
								"target": "prompt",
								"on": "showTaskInput",
								"class": "overflow",
								"customId": null,
								"width": 1,
								"height": null,
								"instances": {},
								"condition": null,
								"devices": [],
								"clickEvent": null
							}
						],
						"class": null,
						"customId": null,
						"instances": {},
						"condition": null,
						"direction": null,
						"align": null,
						"on": null,
						"collapsed": false,
						"name": "task-input"
					}
				],
				"actions": [
					{
						"name": "Cancel Task",
						"on": "cancelTask",
						"confirmation": "Are you sure you want to cancel this task?",
						"operation": "nabu.frameworks.tasks.manage.rest.task.update",
						"route": null,
						"event": null,
						"anchor": null,
						"bindings": {
							"body.alias": "cancelTask.alias",
							"body.contextId": "cancelTask.contextId",
							"body.correlationId": "cancelTask.correlationId",
							"body.creator": "cancelTask.creator",
							"body.dependencyId": "cancelTask.dependencyId",
							"body.groupId": "cancelTask.groupId",
							"body.owner": "cancelTask.owner",
							"body.parentId": "cancelTask.parentId",
							"body.realm": "cancelTask.realm",
							"body.scheduled": "cancelTask.scheduled",
							"body.serviceContext": "cancelTask.serviceContext",
							"body.started": "cancelTask.started",
							"body.state": "fixed.CANCELLED",
							"body.stopped": "cancelTask.stopped",
							"body.target": "cancelTask.target",
							"body.task": "cancelTask.task",
							"body.taskInput": "cancelTask.taskInput",
							"body.taskOutput": "cancelTask.taskOutput",
							"body.taskQueueId": "cancelTask.taskQueueId",
							"body.taskScheduleId": "cancelTask.taskScheduleId",
							"body.taskType": "cancelTask.taskType",
							"taskId": "cancelTask.id"
						},
						"expandBindings": true
					},
					{
						"name": "Retry Task",
						"on": "retryTask",
						"confirmation": "Are you sure you want to retry this task?",
						"operation": "nabu.frameworks.tasks.manage.rest.task.retry",
						"route": null,
						"event": null,
						"anchor": null,
						"bindings": {
							"taskId": "retryTask.id"
						},
						"expandBindings": true
					},
					{
						"name": "Fail Task",
						"on": "failTask",
						"confirmation": "Are you sure you want to set this task to failed?",
						"operation": "nabu.frameworks.tasks.manage.rest.task.update",
						"route": null,
						"event": null,
						"anchor": null,
						"bindings": {
							"body.alias": "failTask.alias",
							"body.contextId": "failTask.contextId",
							"body.correlationId": "failTask.correlationId",
							"body.creator": "failTask.creator",
							"body.dependencyId": "failTask.dependencyId",
							"body.groupId": "failTask.groupId",
							"body.owner": "failTask.owner",
							"body.parentId": "failTask.parentId",
							"body.realm": "failTask.realm",
							"body.scheduled": "failTask.scheduled",
							"body.serviceContext": "failTask.serviceContext",
							"body.started": "failTask.started",
							"body.state": "fixed.FAILED",
							"body.stopped": "failTask.stopped",
							"body.target": "failTask.target",
							"body.task": "failTask.task",
							"body.taskInput": "failTask.taskInput",
							"body.taskOutput": "failTask.taskOutput",
							"body.taskQueueId": "failTask.taskQueueId",
							"body.taskScheduleId": "failTask.taskScheduleId",
							"body.taskType": "failTask.taskType",
							"taskId": "failTask.id"
						},
						"expandBindings": true
					},
					{
						"name": "Wake Up",
						"on": "wakeup",
						"confirmation": null,
						"operation": "nabu.frameworks.tasks.manage.rest.task.wakeup",
						"route": null,
						"event": null,
						"anchor": null,
						"bindings": {},
						"expandBindings": true
					}
				]
			}
		});
	}
});