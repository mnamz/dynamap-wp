<?php

namespace DynaMap;

use DynaMap\Contracts\Runnable;

class App
{
    protected $services = [];

    public function addService(Runnable $service)
    {
        $this->services[] = $service;
    }

    public function run() 
    {
        foreach ($this->services as $service) {
            $service->run();
        }
    }
}
