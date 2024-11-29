import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  launchCount = 0;

  ngOnInit(): void {
    this.trackLaunch();
    this.listenForVisibilityChange(); // Listen for app focus events
  }

  trackLaunch(): void {
    // Get the existing launch count from localStorage
    const storedCount = localStorage.getItem('launchCount');

    if (storedCount) {
      // Parse the count and increment it
      this.launchCount = parseInt(storedCount, 10) + 1;
    } else {
      // If no count exists, this is the first launch
      this.launchCount = 1;
    }

    // Save the updated count back to localStorage
    localStorage.setItem('launchCount', this.launchCount.toString());
  }

  listenForVisibilityChange(): void {
    // Add an event listener for visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  handleVisibilityChange(): void {
    if (document.visibilityState === 'visible') {
      // The app is now in focus
      this.trackLaunch();
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }
}
