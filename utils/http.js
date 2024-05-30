import axios from "axios";

const kickoffCrewAPI = axios.create({
  baseURL: "https://sports-activities-be.onrender.com/api",
});

// export async function authenticateUser(state, code) {
//   let body = { state, code };
//   const response = await axios({
//     method: "POST",
//     url: BACKEND_URL + "/linkedin/login",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     data: JSON.stringify(body),
//   });

//   return response.data.data.jwt;
// }

// export async function fetchUserInfo(token) {
//   const response = await axios({
//     method: "POST",
//     url: BACKEND_URL + "/user/getUserInfo",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data.data;
// }

// export async function fetchOverallEventStatus(token) {
//   const response = await axios({
//     method: "GET",
//     url: BACKEND_URL + "/event/get_overall_event_status",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data.data;
// }

// export async function fetchEventFilters(token) {
//   const response = await axios({
//     method: "GET",
//     url: BACKEND_URL + "/event/get_event_filter",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data.data;
// }

export const postUser = (
  username,
  first_name,
  last_name,
  age,
  avatar_url,
  interests
) => {
  return kickoffCrewAPI
    .post("/users", {
      username,
      first_name,
      last_name,
      age,
      avatar_url,
      interests,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {});
};

export function fetchHostedEvents(username) {
  return kickoffCrewAPI.get(`/events/host/${username}`);
}

export function fetchJoinedEvents(username) {
  return kickoffCrewAPI.get(`/members/${username}`, {
    params: {
      is_accepted: "true",
    },
  });
}

export function fetchPendingEvents(username) {
  return kickoffCrewAPI.get(`/members/${username}`, {
    params: {
      is_accepted: "pending",
    },
  });
}

export function fetchReceivedInvitations(username) {
  return kickoffCrewAPI.get(`/events/host/${username}/requests`);
}

export function fetchCategoryList() {
  return kickoffCrewAPI.get("/categories");
}

export function fetchEventList(category, skill_level) {
  return kickoffCrewAPI.get("/events", {
    params: {
      category,
      skill_level,
    },
  });
}

export function fetchEvent(eventId) {
  return kickoffCrewAPI.get(`/events/${eventId}`);
}

export function fetchEventHost(username) {
  return kickoffCrewAPI.get(`/users/${username}`);
}

export function fetchEventMembers(eventId) {
  return kickoffCrewAPI.get(`/events/${eventId}/members`);
}

export function joinEvent(token, eventId) {
  return axios({
    method: "POST",
    url: BACKEND_URL + `/event/join/${eventId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createEvent(
  event_name,
  host,
  location,
  date,
  category,
  age_range,
  price,
  capacity,
  skill_level,
  description
) {
  return kickoffCrewAPI.post(`/events`, {
    event_name,
    host,
    location,
    date,
    category,
    age_range,
    price,
    capacity,
    skill_level,
    description,
  });
}

export async function fetchActivities(type, token) {
  const response = await axios({
    method: "GET",
    url: BACKEND_URL + `/event/related_event?type=${type}&start=0&end=10`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function fetchActivity(eventId, token) {
  const response = await axios({
    method: "GET",
    url:
      BACKEND_URL + `/event/related_request?eventId=${eventId}&start=0&end=10`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export function approveEvent(eventId, userId, token) {
  let body = { eventId, userId };
  return axios({
    method: "POST",
    url: BACKEND_URL + `/event/approve`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(body),
  });
}

export function withdrawEvent(eventId, token) {
  let body = { eventId };
  return axios({
    method: "POST",
    url: BACKEND_URL + `/event/withdraw/${eventId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(body),
  });
}

export function cancelEvent(eventId, cancelMessage, token) {
  let body = { cancelMessage };
  return axios({
    method: "POST",
    url: BACKEND_URL + `/event/cancel/${eventId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(body),
  });
}

export async function fetchChats(token) {
  const response = await axios({
    method: "GET",
    url: BACKEND_URL + `/chat/getOverAll`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function createNewChat(eventId, token) {
  let body = { eventId };
  const response = await axios({
    method: "POST",
    url: BACKEND_URL + `/chat/startChatRoomWithEventId`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(body),
  });

  return response.data.data;
}

export async function fetchMessages(chatRoomId, token) {
  const response = await axios({
    method: "GET",
    url:
      BACKEND_URL + `/chat/getMessage?chatRoomId=${chatRoomId}&start=0&end=100`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function fetchMyActivities(token) {
  const response = await axios({
    method: "GET",
    url: BACKEND_URL + `/event/get_all_my_events?start=0&end=100`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function sendMessage(body, token) {
  const response = await axios({
    method: "POST",
    url: BACKEND_URL + `/chat/send`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(body),
  });

  return response.data.data;
}

export async function fetchChatRoomInfo(chatRoomId, token) {
  const response = await axios({
    method: "GET",
    url: BACKEND_URL + `/chat/getChatRoom?chatRoomId=${chatRoomId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function fetchOtherUserInfo(token, userId) {
  const response = await axios({
    method: "GET",
    url: BACKEND_URL + `/user/getOtherUserInfo?userId=${userId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
}

export async function addFeedback(content, contact, token) {
  let body = { content, contact };
  const response = await axios({
    method: "POST",
    url: BACKEND_URL + `/feedback/add`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(body),
  });

  return response.data.data;
}

export async function fetchTermsAndConditions() {
  const response = await axios({
    method: "GET",
    url: BACKEND_URL + `/announcement/getTermsAndConditions`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data.data;
}

export async function fetchPrivacyPolicy() {
  const response = await axios({
    method: "GET",
    url: BACKEND_URL + `/announcement/getPrivacyPolicy`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data.data;
}

export function addPushToken(pushToken, token) {
  let body = { token: pushToken };
  return axios({
    method: "POST",
    url: BACKEND_URL + `/notifications/addToken`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(body),
  });
}
