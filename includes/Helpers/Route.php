<?php 

namespace DynaMap\Helpers;
use DynaMap\Contracts\Runnable;
use DynaMap\Controller\Location;

// todo : buat create entries to wp_map_locations. sini create GET request to retrieve data and coord
// class Route implements Runnable {

// }

class Route implements Runnable{
    public function run() {
        add_action('rest_api_init', [$this, 'registerEndpoints']);
        flush_rewrite_rules();
    }
    public static function registerEndpoints(){
        register_rest_route('api', '/locations', array(
            array(
                'methods' => 'POST',
                'callback' => array(Location::class, 'create'),
            ),
            array(
                'methods' => 'GET',
                'callback' => array(Location::class, 'index'),
            ),
            array(
                'methods' => 'PUT',
                'callback' => array(Location::class, 'update'),
            ),
            array(
                'methods' => 'DELETE',
                'callback' => array(Location::class, 'delete'),
            ),
        ));
    }
}