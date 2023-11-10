# Generated by Django 4.2.6 on 2023-11-10 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filmes', '0002_alter_filme_options_remove_filme_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filme',
            name='review',
            field=models.CharField(blank=True, help_text='Digite um breve review do filme', max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='filme',
            name='sinopse',
            field=models.CharField(blank=True, help_text='Digite a sinopse do filme', max_length=1000, null=True),
        ),
    ]