<div class="wrap">
    <h2>Map</h2>
    <h2>Locations List</h2>
    <table id="locations_table" class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Details</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <h2>Add New Location</h2>
    <form method="post" id="location_form" action="">
        <table class="form-table">
            <tr>
                <th scope="row"><label for="location_name">Name:</label></th>
                <td><input type="text" name="name" id="location_name" required></td>
            </tr>
            <tr>
                <th scope="row"><label for="location_details">Details:</label></th>
                <td><?php wp_editor('', 'details', array('textarea_name' => 'details')); ?></td>
            </tr>
            <tr>
            <th scope="row"><label for="location_postion">Select Location (pin on the map):</label></th>
            <td>
                <div id="react-component">
                    <div id="map-preview">
                    <h2>Loading...</h2>
                    </div>
                </div>
            </td>
        
            </tr>
        </table>
        
        <input type="submit" name="submit_location" class="button-primary" value="Add Location">
    </form>
</div>