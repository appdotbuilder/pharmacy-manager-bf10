<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\StoreSetting
 *
 * @property int $id
 * @property string $store_name
 * @property string $address
 * @property string $phone
 * @property string|null $email
 * @property string|null $license_number
 * @property string|null $tax_number
 * @property string|null $receipt_footer
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereLicenseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereReceiptFooter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereStoreName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereTaxNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StoreSetting whereUpdatedAt($value)
 * @method static \Database\Factories\StoreSettingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StoreSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'store_name',
        'address',
        'phone',
        'email',
        'license_number',
        'tax_number',
        'receipt_footer',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}