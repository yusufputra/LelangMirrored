<?php

namespace App\Console;

use App\BarangLelang;
use App\Transaksi;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();
        $schedule->call(function () {
            //
            $barangLelang = BarangLelang::whereNotNull('waktu_akhir')
                ->get(['id', 'waktu_akhir']);

            $timeExecuted = time();
            foreach ($barangLelang as $barang) {

                if (($timeExecuted - strtotime($barang->waktu_akhir)) < 60) {
                    $penawaranMenang = end($barang->penawaran);

                    $newTransaksi = new Transaksi;
                    $newTransaksi->id_penawaran = $penawaranMenang->id;
                    $newTransaksi->kode_unik = mt_rand(101, 999);
                    $newTransaksi->username_penggguna = $penawaranMenang->username_pengguna;

                    $newTransaksi->save();
                }
            }
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
