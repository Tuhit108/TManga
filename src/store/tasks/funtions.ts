import { Fetch } from "@/utils/fetch";
import { addTasksBefore, replaceAllIds, syncAllTasks, syncTask } from "@/store/tasks";
import { newFormData } from "@/utils";
import { RawTask } from "@/types";

export const requestGetTaskList = async (params: any) => {
  const formData = newFormData(params);
  const { data } = await Fetch.post("/mobile/mytask/load", formData);
  if (!data) {
    return [];
  }
  if (params.page == 1) {
    replaceAllIds(data.tasks);
  } else {
    syncAllTasks(data.tasks);
  }

  return data.tasks.map((item: RawTask) => item.id);
};

export const requestTaskDetail = async (params: any) => {
  const formData = newFormData(params);
  const { data } = await Fetch.post("/v3/task/get", formData);

  if (!data) {
    return;
  }

  syncTask([data.task]);
  return data.task;
};

export const requestCreateTask = async (params: any) => {
  const formData = newFormData(params);

  console.log("params",params);
  const { data } = await Fetch.post(
    "/v3/task/add",
    formData
  );
  if (!data) {
    return null;
  }
  if (data.code == 1) {
    addTasksBefore(data.task);
  }
  return data;
};



