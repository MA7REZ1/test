<?php
require_once '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $country = $_POST['country'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $benefits = $_POST['benefits'];
    $requirements = $_POST['requirements'];
    $apply_link = $_POST['apply_link'];
    
    // Simple mock image for now - in a real app we would handle file uploads
    $image_url = "https://images.unsplash.com/photo-1523050853023-8c2d275438b9?auto=format&fit=crop&w=800&q=80";

    $stmt = $pdo->prepare("INSERT INTO scholarships (country, title, description, benefits, requirements, apply_link, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$country, $title, $description, $benefits, $requirements, $apply_link, $image_url]);

    header("Location: index.php");
    exit;
}

require_once 'header.php';
?>

<div class="glass-card max-w-2xl mx-auto">
    <h2 class="text-xl font-bold mb-6">إضافة منحة جديدة</h2>
    
    <form action="add.php" method="POST">
        <div class="form-group">
            <label class="block mb-2 text-text-muted">الدولة</label>
            <input type="text" name="country" class="form-control" placeholder="مثال: تركيا، رومانيا..." required>
        </div>

        <div class="form-group">
            <label class="block mb-2 text-text-muted">عنوان المنحة</label>
            <input type="text" name="title" class="form-control" placeholder="مثال: منحة الحكومة التركية 2026" required>
        </div>

        <div class="form-group">
            <label class="block mb-2 text-text-muted">الوصف</label>
            <textarea name="description" class="form-control" rows="4" placeholder="وصف موجز للمنحة..."></textarea>
        </div>

        <div class="form-group">
            <label class="block mb-2 text-text-muted">المميزات</label>
            <textarea name="benefits" class="form-control" rows="3" placeholder="ماذا تغطي المنحة؟"></textarea>
        </div>

        <div class="form-group">
            <label class="block mb-2 text-text-muted">المتطلبات</label>
            <textarea name="requirements" class="form-control" rows="3" placeholder="الشروط المطلوبة للتقديم..."></textarea>
        </div>

        <div class="form-group">
            <label class="block mb-2 text-text-muted">رابط التقديم</label>
            <input type="url" name="apply_link" class="form-control" placeholder="https://...">
        </div>

        <div class="mt-8 flex gap-4">
            <button type="submit" class="btn btn-primary px-8">حفظ المنحة</button>
            <a href="index.php" class="btn btn-outline">إلغاء</a>
        </div>
    </form>
</div>

<?php require_once 'footer.php'; ?>
