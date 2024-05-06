import sendRequest from './send-request';
const BASE_URL = '/api/journalEntries';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getByUser(userId) {
  return sendRequest(`${BASE_URL}/user/${userId}`);
}

export function create(entryData) {
  return sendRequest(BASE_URL, 'POST', entryData);
}

export function getById(entryId) {
  return sendRequest(`${BASE_URL}/${entryId}`);
}

export function update(entryId, updatedData) {
  return sendRequest(`${BASE_URL}/${entryId}`, 'PUT', updatedData);
}

export function deleteEntry(entryId) {
  return sendRequest(`${BASE_URL}/${entryId}`, 'DELETE');
}