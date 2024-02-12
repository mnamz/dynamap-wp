import $ from 'jquery';
import Swal from 'sweetalert2';
import ReactDOM from 'react-dom';
import MapImage from "./components/MapImage";
import map from './assets/map.png'


/**
 * Import the stylesheet for the plugin.
 */
import './style/main.scss';

ReactDOM.render(<MapImage imageUrl={map} parentClass={document.getElementById('map-preview').classList}/>, document.getElementById('map-preview'));

/**
 * Admin page scripts
 */
$(document).ready(function() {
    console.log('hehe')
    loadLocations();

    $('#location_form').on('submit', function(e) {
        e.preventDefault(); 
        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '/wp-json/api/locations',
            data: formData,
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: response.response,
                });
                loadLocations();
                $('#location_form')[0].reset(); 
            },
            error: function(xhr, status, error) {
                alert('Failed to add location: ' + error);
            }
        });
    });

    function loadLocations() {
        $.ajax({
            url: '/wp-json/api/locations',
            method: 'GET',
            success: function(response) {
                $('#locations_table tbody').empty();
                response.response.forEach(function(location) {
                    var row = '<tr>' +
                        '<td>' + location.name + '</td>' +
                        '<td>' + location.details + '</td>' +
                        '<td>' +
                            '<button class="delete-location-btn" style="background-color: red; color: white;" data-location-id="' + location.id + '">' +
                                '<span class="dashicons dashicons-trash"></span>' +
                            '</button>' +
                        '</td>' +
                    '</tr>';
                    $('#locations_table tbody').append(row);
                });
            },
            error: function(xhr, status, error) {
                console.error('Failed to load locations:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oopsie daisy!',
                    text: 'Failed to load locations. Please try again later.',
                });
            }
        });
    }

    $('#locations_table').on('click', '.delete-location-btn', function() {
        var locationId = $(this).data('location-id');
        Swal.fire({
            title: 'Fr?',
            text: 'You will not be able to recover this location!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/wp-json/api/locations',
                    method: 'DELETE',
                    data: { id: locationId },
                    success: function(response) {
                        loadLocations();
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: response.response,
                        });
                    },
                    error: function(xhr, status, error) {
                        console.error('Failed to delete location:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oopsie...',
                            text: 'Failed to delete location. Please try again later.',
                        });
                    }
                });
            }
        });
    });    
});