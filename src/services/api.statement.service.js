import createApiClient from './config/api.service';
import { convertDateToMMDDYYYY } from '../helpers/dateFormats/dateFormats';
class StatementService {
    constructor(baseURL = '/api/v1/documents') {
        this.apiClient = createApiClient(baseURL);
    }

    async getAll(params) {
        try {
            const response = await this.apiClient.get('/search', { params });
            console.log('Service response: ', response);
            return response;
        } catch (error) {
            console.error('Error fetching all statements:', error);
            throw error;
        }
    }

    // async delete(id) {
    //     try {
    //         const response = await this.apiClient.delete(`/${id}`);
    //         return response;
    //     } catch (error) {
    //         console.error(`Error deleting statement with ID ${id}:`, error);
    //         throw error;
    //     }
    // }

    async deleteSelected(data) {
        try {
            const response = await this.apiClient.post(
                '/destroy_multiple',
                data
            );
            return response;
        } catch (error) {
            console.error('Error deleting selected statements:', error);
            throw error;
        }
    }

    async fetchAll(params) {
        try {
            const response = await this.getAll(params);
            return response;
        } catch (error) {
            console.error('Error fetching statements (fetchAll):', error);
            throw error;
        }
    }

    async remove(id) {
        try {
            const response = await this.delete(id);
            return response;
        } catch (error) {
            console.error(
                `Error removing statement with ID ${id} (remove):`,
                error
            );
            throw error;
        }
    }

    async removeSelected(data) {
        try {
            const response = await this.deleteSelected(data);
            return response;
        } catch (error) {
            console.error(
                'Error removing selected statements (removeSelected):',
                error
            );
            throw error;
        }
    }

    setQuery(page, pageSize, searchObject, sortObject) {
        let params = {};
        if (page >= 0) params['page_id'] = page;
        if (pageSize > 0) params['page_size'] = pageSize;
        if (searchObject) {
            if (searchObject.name) params['original_name'] = searchObject.name;
            if (
                searchObject.status &&
                searchObject.status != [] &&
                searchObject.status.length > 0
            ) {
                params['status'] = searchObject.status.join(',');
            }
            if (searchObject.startDate)
                params['start_date'] = convertDateToMMDDYYYY(
                    searchObject.startDate
                );
            if (searchObject.endDate)
                params['end_date'] = convertDateToMMDDYYYY(
                    searchObject.endDate
                );
        }
        if (sortObject) {
            let filteredKey = null;
            let filteredValue = null;

            for (const [key, value] of Object.entries(sortObject)) {
                if (value !== null) {
                    filteredKey = key;
                    filteredValue = value;
                    break;
                }
            }

            if (filteredKey && filteredValue !== null) {
                if (filteredKey == 'dateUpload') {
                    params['sort'] = `created_at,${filteredValue}`;
                } else if (filteredKey == 'name') {
                    params['sort'] = `original_name,${filteredValue}`;
                } else {
                    params['sort'] = `${filteredKey},${filteredValue}`;
                }
            }
        }
        params['user_id'] = '7964e489-5d4d-4a2f-ac4c-ad5ac6e22730';
        console.log('resquest query: ', params);
        return params;
    }
}

export default new StatementService();
