import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-campaign-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent {
  title = '';
  description = '';
  showSuccessMessage = false;

  constructor(private router: Router) {}

  saveCampaign() {
    if (!this.title || !this.description) return;

    const newCampaign = {
      id: Date.now(),
      title: this.title,
      description: this.description,
      point: 0,
      date: new Date().toLocaleDateString('tr-TR'),
    };

    const existing = localStorage.getItem('campaigns');
    const campaigns = existing ? JSON.parse(existing) : [];

    campaigns.push(newCampaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));

    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
      this.router.navigate(['/campaign']);
    }, 2000);
  }
}
