import { Fetch } from "@/utils/fetch";
import { RawProject } from "@/types";
import { newFormData } from "@/utils";
import { syncAllProjects } from "@/store/project";

export const requestGetProjectList = async (params: any) => {
  const formData = newFormData(params);
  const {data} = await Fetch.post('/v3/project/list', formData);
  if (!data) {
    return []
  }



  syncAllProjects(data.projects);

  return data.projects.map((item: any) => item.id);
};

