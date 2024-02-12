<?php 

namespace DynaMap\Database;
use DynaMap\Contracts\Runnable;

class MapTable implements Runnable {
    
    public function run() {
        $this->createMapTable();
    }

    private function createMapTable() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'map_locations';

        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            details VARCHAR(255) NOT NULL,
            position VARCHAR(255) NOT NULL
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql); 
    }
}