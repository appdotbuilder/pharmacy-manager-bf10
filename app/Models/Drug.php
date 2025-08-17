<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Drug
 *
 * @property int $id
 * @property string $name
 * @property string|null $generic_name
 * @property string $batch_number
 * @property \Illuminate\Support\Carbon $expiry_date
 * @property float $cost_price
 * @property float $selling_price
 * @property int $stock_quantity
 * @property int $minimum_stock_level
 * @property string|null $description
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PurchaseItem> $purchaseItems
 * @property-read int|null $purchase_items_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\SaleItem> $saleItems
 * @property-read int|null $sale_items_count
 * @property-read bool $is_low_stock
 * @property-read bool $is_expired
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Drug newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Drug newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Drug query()
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereBatchNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereCostPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereExpiryDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereGenericName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereMinimumStockLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereSellingPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereStockQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Drug active()
 * @method static \Illuminate\Database\Eloquent\Builder|Drug lowStock()
 * @method static \Illuminate\Database\Eloquent\Builder|Drug expired()
 * @method static \Database\Factories\DrugFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Drug extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'generic_name',
        'batch_number',
        'expiry_date',
        'cost_price',
        'selling_price',
        'stock_quantity',
        'minimum_stock_level',
        'description',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'expiry_date' => 'date',
        'cost_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'stock_quantity' => 'integer',
        'minimum_stock_level' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the purchase items for the drug.
     */
    public function purchaseItems(): HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }

    /**
     * Get the sale items for the drug.
     */
    public function saleItems(): HasMany
    {
        return $this->hasMany(SaleItem::class);
    }

    /**
     * Check if the drug is low in stock.
     */
    public function getIsLowStockAttribute(): bool
    {
        return $this->stock_quantity <= $this->minimum_stock_level;
    }

    /**
     * Check if the drug is expired.
     */
    public function getIsExpiredAttribute(): bool
    {
        return $this->expiry_date->isPast();
    }

    /**
     * Scope a query to only include active drugs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include drugs with low stock.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLowStock($query)
    {
        return $query->whereColumn('stock_quantity', '<=', 'minimum_stock_level');
    }

    /**
     * Scope a query to only include expired drugs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeExpired($query)
    {
        return $query->where('expiry_date', '<', now());
    }
}