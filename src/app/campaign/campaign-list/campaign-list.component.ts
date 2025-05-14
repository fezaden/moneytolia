import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Campaign {
  id: number;
  title: string;
  description: string;
  point: number;
  date: string;
}

@Component({
  standalone: true,
  selector: 'app-campaign-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent {
  campaigns: Campaign[] = [];

  // modal state
  isModalOpen = false;
  editCampaign: Campaign = { id: 0, title: '', description: '', point: 0, date: '' };

  ngOnInit(): void {
    const data = localStorage.getItem('campaigns');
    this.campaigns = data ? JSON.parse(data) : [];
  }

  saveToLocalStorage() {
    localStorage.setItem('campaigns', JSON.stringify(this.campaigns));
  }

  increasePoint(c: Campaign) {
    c.point += 1;
    this.saveToLocalStorage();
  }

  decreasePoint(c: Campaign) {
    if (c.point > 0) {
      c.point -= 1;
      this.saveToLocalStorage();
    }
  }

  deleteCampaign(id: number) {
    this.campaigns = this.campaigns.filter(c => c.id !== id);
    this.saveToLocalStorage();
  }

  openModal(campaign: Campaign) {
    this.isModalOpen = true;
    this.editCampaign = { ...campaign };
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveUpdate() {
    const index = this.campaigns.findIndex(c => c.id === this.editCampaign.id);
    if (index !== -1) {
      this.campaigns[index].title = this.editCampaign.title;
      this.campaigns[index].description = this.editCampaign.description;
      this.saveToLocalStorage();
    }
    this.closeModal();
  }
}
