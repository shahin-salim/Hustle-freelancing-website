# Generated by Django 4.0.4 on 2022-04-24 04:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('subcategory', '0001_initial'),
        ('services', '0007_alter_services_image1_alter_services_image2_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='services',
            name='image1',
            field=models.ImageField(upload_to='ProductImage/'),
        ),
        migrations.AlterField(
            model_name='services',
            name='image2',
            field=models.ImageField(upload_to='ProductImage/'),
        ),
        migrations.AlterField(
            model_name='services',
            name='sub_category_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='subcategory.subcategory'),
        ),
    ]