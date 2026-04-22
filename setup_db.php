<?php
require_once 'includes/db.php';

try {
    // Read the SQL file
    $sql = file_get_contents('schema.sql');
    
    // Execute the SQL
    $pdo->exec($sql);
    
    echo "<div style='font-family: Arial; padding: 20px; background: #dcfce7; color: #166534; border-radius: 8px;'>
            <h2>✅ تم إعداد قاعدة البيانات بنجاح!</h2>
            <p>تم إنشاء الجداول المطلوبة. يمكنك الآن العودة إلى <a href='index.php'>الصفحة الرئيسية</a> أو <a href='admin/index.php'>لوحة التحكم</a>.</p>
          </div>";
} catch (PDOException $e) {
    echo "<div style='font-family: Arial; padding: 20px; background: #fee2e2; color: #991b1b; border-radius: 8px;'>
            <h2>❌ خطأ في الإعداد:</h2>
            <p>" . $e->getMessage() . "</p>
            <p>تأكد من إنشاء قاعدة بيانات باسم <b>scholarship_db</b> في phpMyAdmin أولاً.</p>
          </div>";
}
?>
