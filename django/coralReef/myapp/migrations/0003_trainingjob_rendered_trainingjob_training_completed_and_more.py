# Generated by Django 4.2.11 on 2024-04-23 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_alter_trainingjob_success_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='trainingjob',
            name='rendered',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='trainingjob',
            name='training_completed',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='trainingjob',
            name='training_started',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
