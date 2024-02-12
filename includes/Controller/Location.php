<?php 

namespace DynaMap\Controller;
class Location {
    public static function create($request) {
        $parameters = $request->get_params();
        $name = sanitize_text_field($parameters['name']);
        $details = sanitize_textarea_field($parameters['details']);
        $position = sanitize_text_field($parameters['position']);

        global $wpdb;
        $result = $wpdb->insert(
            'wp_map_locations',
            array(
                'name' => $name,
                'details' => $details,
                'position' => $position
            ),
            array(
                '%s',
                '%s',
                '%s'
            )
        );

        if ($result) {
            return rest_ensure_response(array('status' => 'success', 'response' => 'Location added successfully!'));
        } else {
            return rest_ensure_response(array('status' => 'error', 'response' => 'Failed to add location.'));
        }    
    }

    public static function delete($request) {
        $parameters = $request->get_params();
        $location_id = intval($parameters['id']);

        if ($location_id <= 0) {
            return rest_ensure_response('Invalid location ID.');
        }

        global $wpdb;
        $result = $wpdb->delete(
            'wp_map_locations',
            array('id' => $location_id),
            array('%d')
        );

        if ($result === false) {
            return rest_ensure_response(array('status' => 'error', 'response' => 'Failed to delete location.'));
        }

        return rest_ensure_response(array('status' => 'success', 'response' => 'Location deleted successfully!'));
    }


    public static function index($request) {
        global $wpdb;
        $locations = $wpdb->get_results("SELECT * FROM wp_map_locations", ARRAY_A);

        return rest_ensure_response(array('status' => 'success', 'response' => $locations));
    }
    public static function update($request) {
        $parameters = $request->get_params();
        $location_id = intval($parameters['id']);
        $name = sanitize_text_field($parameters['name']);
        $details = sanitize_textarea_field($parameters['details']);
        $position = sanitize_text_field($parameters['position']);

        if ($location_id <= 0) {
            return rest_ensure_response(array('status' => 'error', 'response' => 'Invalid location ID.'));
        }

        global $wpdb;
        $result = $wpdb->update(
            'wp_map_locations',
            array(
                'name' => $name,
                'details' => $details,
                'position' => $position
            ),
            array('id' => $location_id),
            array(
                '%s',
                '%s',
                '%s'
            ),
            array('%d')
        );

        if ($result === false) {
            return rest_ensure_response(array('status' => 'error', 'response' => 'Failed to update location.'));
        }

        return rest_ensure_response(array('status' => 'success', 'response' => 'Location updated successfully!'));
    }
    
}
