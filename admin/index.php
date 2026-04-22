<?php
require_once '../includes/db.php';
require_once 'header.php';

$stmt = $pdo->query("SELECT * FROM scholarships ORDER BY created_at DESC");
$scholarships = $stmt->fetchAll();
?>

<div class="glass-card">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">قائمة المنح المتاحة</h2>
        <a href="add.php" class="btn btn-primary">+ إضافة منحة</a>
    </div>

    <?php if (empty($scholarships)): ?>
        <div class="p-10 text-center text-text-muted">
            <p>لا توجد منح حالياً. ابدأ بإضافة أول منحة!</p>
        </div>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>الدولة</th>
                    <th>عنوان المنحة</th>
                    <th>تاريخ الإضافة</th>
                    <th>الإجراءات</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($scholarships as $s): ?>
                    <tr>
                        <td><span class="text-accent"><?php echo htmlspecialchars($s['country']); ?></span></td>
                        <td><?php echo htmlspecialchars($s['title']); ?></td>
                        <td><?php echo date('Y-m-d', strtotime($s['created_at'])); ?></td>
                        <td>
                            <a href="edit.php?id=<?php echo $s['id']; ?>" class="text-accent hover:underline ml-4">تعديل</a>
                            <a href="delete.php?id=<?php echo $s['id']; ?>" class="text-red-400 hover:underline" onclick="return confirm('هل أنت متأكد من الحذف؟')">حذف</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>

<?php require_once 'footer.php'; ?>
