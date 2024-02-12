<?php

/*
Plugin Name: Dynamic Map
Description: Creates pin onto map dynamically
Version: 1.0
Author: Aliif Zin
Author URI: https://aliifz.com
*/

require __DIR__ . '/vendor/autoload.php';

define('PLUGIN_URL', str_replace('http://', 'https://', untrailingslashit(plugin_dir_url(__FILE__))));
define('PLUGIN_PATH', untrailingslashit(plugin_dir_path(__FILE__)));

$app = new DynaMap\App;

$app->addService(new DynaMap\Admin\Map);
$app->addService(new DynaMap\Database\MapTable);
$app->addService(new DynaMap\Helpers\Route);

$app->run();
