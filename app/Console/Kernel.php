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
                ->has('transaksi', '=', 0)->get(['id', 'waktu_akhir']);

            $timeExecuted = time();
            foreach ($barangLelang as $barang) {

                $time_diff = $timeExecuted - strtotime($barang->waktu_akhir);
                error_log($time_diff);
                if ($time_diff > 0 && $time_diff <= 60) {
                    $penawaranMenang = $barang->penawaran[count($barang->penawaran) - 1];
                    error_log($penawaranMenang);

                    $newTransaksi = new Transaksi;
                    $newTransaksi->id_barang = $barang->id;
                    $newTransaksi->id_penawaran = $penawaranMenang->id;
                    $newTransaksi->kode_unik = mt_rand(101, 999);
                    $newTransaksi->username_pengguna = $penawaranMenang->username_pengguna;

                    $newTransaksi->save();
                    error_log('masuk pak eko');
                }

                error_log('halo');
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
