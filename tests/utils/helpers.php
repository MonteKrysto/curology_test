<?php

function create($class, $updateOrCreate = 'create', $attributes = [], $times = null)
{

  if($updateOrCreate == 'create') {
    return factory($class)->states('create')->create();
  } else {
    return factory($class)->states('update')->create($attributes);
  }
}

function make($class, $attributes = [], $times = null)
{
  return factory($class, $times)->make($attributes);
}

function raw($class, $attributes = [], $times = null)
{
  return factory($class, $times)->states('create')->raw($attributes);
}
