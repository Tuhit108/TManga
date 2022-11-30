import { newFormData } from "@/utils";
import { Fetch } from "@/utils/fetch";
import { syncAllMembers } from "@/store/member/index";

export const requestGetListMember = async (params: any) => {
  const formData = newFormData(params);
  const { data } = await Fetch.post("https://api.base.vn/ajax/api/user/people", formData);

  if (!data) {
    return null;
  }

  syncAllMembers(data.people)

  return data;
};




