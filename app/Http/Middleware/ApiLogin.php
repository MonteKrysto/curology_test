<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ApiLogin
{
    /**
     * Handle an incoming request.
     * 
     * Query the keys in case the keys were compromised or reset.  By querying when needed,
     * instead of using and ENV variable, we assure the keys being used are correct
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Log::info('HANDLE');
        $secret = DB::table('oauth_clients')
            ->where('id', 3)
            ->pluck('secret')
            ->first();

        $request->merge([
            'grant_type' => 'password',
            'client_id' => 3,
            'client_secret' => $secret,
            'username' => 'kvothe@notw.com',
            'password' => 'windwind'
        ]);
        Log::info('HERE');
        Log::info($request);


        return $next($request);
    }
}
