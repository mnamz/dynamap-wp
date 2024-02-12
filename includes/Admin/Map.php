<?php

namespace DynaMap\Admin;
use DynaMap\Contracts\Runnable;

class Map implements Runnable {
    public function run() {
        add_action('admin_menu', [$this, 'createAdminPage']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts'] );
        add_action('wp_enqueue_scripts', [$this, 'enqueueScripts'] );
        add_shortcode('dyna_map', [$this,'mapShortcode'] );
    }

    public function createAdminPage() {
        add_menu_page(
            'Map', // Page title
            'Map',
            'manage_options',
            'dyna-map',
            [$this, 'renderMapSetup'],
            'dashicons-admin-site',
            50
        );
    }

    public function renderMapSetup() {
        require_once plugin_dir_path( dirname ( dirname(__FILE__) ) ) . 'templates/admin/map.php';
    }

    public function mapShortcode($atts) {
        require_once plugin_dir_path( dirname ( dirname(__FILE__) ) ) . 'templates/home-map.php';
    }

    public function enqueueScripts() {
        wp_enqueue_style( 'dynamap-style', untrailingslashit(PLUGIN_URL) . '/build/index.css' );
        wp_enqueue_script( 'dynamap-script', untrailingslashit(PLUGIN_URL) . '/build/index.js', array( 'wp-element' ), '1.0.0', true );
    }
}